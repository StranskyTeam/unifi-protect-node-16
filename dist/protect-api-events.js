import zlib from "node:zlib";
/*
 * The UniFi Protect realtime updates API is largely undocumented and has been reverse engineered mostly through
 * trial and error, as well as observing the Protect controller in action.
 *
 * Here's how to get started with the UniFi Protect Updates API:
 *
 * 1. Login to the UniFi Protect controller, obtain the bootstrap JSON.
 * 2. Open the websocket to the updates URL (see protect-api.ts).
 *
 * Then you're ready to listen to messages. You can see an example of this in protect-nvr.ts.
 *
 * Those are the basics and gets us up and running. Now, to explain how the updates API works...
 *
 * UniFi OS update data packets are used to provide a realtime stream of updates to Protect. It differs from
 * the system events API in that the system events API appears to be shared across other applications (Network, Access, etc.)
 * while the updates events API appears to only be utilized by Protect and not shared by other applications, although the protocol
 * is shared.
 *
 * So how does it all work? Cameras continuously stream updates to the UniFi Protect controller containing things like camera
 * health, statistics, and - crucially for us - events such as motion and doorbell ring. A complete update packet is composed of four
 * frames:
 *
 * Header Frame (8 bytes)
 * Action Frame
 * Header Frame (8 bytes)
 * Data Frame
 *
 * The header frame is required overhead since websockets provide only a transport medium. It's purpose is to tell us what's
 * coming in the frame that follows.
 *
 * The action frame identifies what the action and category that the update contains:
 *
 * Property      Description
 * --------      -----------
 * action        What action is being taken. Known actions are "add" and "update".
 * id            The identifier for the device we're updating.
 * modelKey      The device model category that we're updating.
 * newUpdateId   A new UUID generated on a per-update basis. This can be safely ignored it seems.
 *
 * The final part of the update packet is the data frame. The data frame can be three different types of data - although in
 * practice, I've only seen JSONs come across. Those types are:
 *
 * Payload Type  Description
 * 1             JSON. For update actions that are not events, this is always a subset of the configuration bootstrap JSON.
 * 2             A UTF8-encoded string
 * 3             Node Buffer
 *
 * Some tips:
 *
 * - "update" actions are always tied to the following modelKeys: camera, event, nvr, and user.
 *
 * - "add" actions are always tied to the "event" modelKey and indicate the beginning of an event item in the Protect events list.
 *   A subsequent "update" action is sent signaling the end of the event capture, and it's confidence score for motion detection.
 *
 * - The above is NOT the same thing as motion detection. If you want to detect motion, you should watch the "update" action for "camera"
 *   modelKeys, and look for a JSON that updates lastMotion. For doorbell rings, lastRing. The Protect events list is useful for the
 *   Protect app, but it's of limited utility to HomeKit, and it's slow - relative to looking for lastMotion that is. If you want true
 *   realtime updates, you want to look at the "update" action.
 *
 * - JSONs are only payload type that seems to be sent, although the protocol is designed to accept all three.
 *
 * - With the exception of update actions with a modelKey of event, JSONs are always a subset of the bootstrap JSON, indexed off
 *   of modelKey. So for a modelKey of camera, the data payload is always a subset of ProtectCameraConfigInterface (see protect-types.ts).
 */
// UniFi Protect events API packet header size, in bytes.
const EVENT_PACKET_HEADER_SIZE = 8;
// Update realtime API packet types.
var ProtectEventPacketType;
(function (ProtectEventPacketType) {
    ProtectEventPacketType[ProtectEventPacketType["HEADER"] = 1] = "HEADER";
    ProtectEventPacketType[ProtectEventPacketType["PAYLOAD"] = 2] = "PAYLOAD";
})(ProtectEventPacketType || (ProtectEventPacketType = {}));
// Update realtime API payload types.
var EventPayloadType;
(function (EventPayloadType) {
    EventPayloadType[EventPayloadType["JSON"] = 1] = "JSON";
    EventPayloadType[EventPayloadType["STRING"] = 2] = "STRING";
    EventPayloadType[EventPayloadType["BUFFER"] = 3] = "BUFFER";
})(EventPayloadType || (EventPayloadType = {}));
/* A packet header is composed of 8 bytes in this order:
 *
 * Byte Offset  Description      Bits  Values
 * 0            Packet Type      8     1 - header frame, 2 - payload frame.
 * 1            Payload Format   8     1 - JSON object, 2 - UTF8-encoded string, 3 - Node Buffer.
 * 2            Deflated         8     0 - uncompressed, 1 - compressed / deflated (zlib-based compression).
 * 3            Unknown          8     Always 0. Possibly reserved for future use by Ubiquiti?
 * 4-7          Payload Size:    32    Size of payload in network-byte order (big endian).
 */
var ProtectEventPacketHeader;
(function (ProtectEventPacketHeader) {
    ProtectEventPacketHeader[ProtectEventPacketHeader["TYPE"] = 0] = "TYPE";
    ProtectEventPacketHeader[ProtectEventPacketHeader["PAYLOAD_FORMAT"] = 1] = "PAYLOAD_FORMAT";
    ProtectEventPacketHeader[ProtectEventPacketHeader["DEFLATED"] = 2] = "DEFLATED";
    ProtectEventPacketHeader[ProtectEventPacketHeader["UNKNOWN"] = 3] = "UNKNOWN";
    ProtectEventPacketHeader[ProtectEventPacketHeader["PAYLOAD_SIZE"] = 4] = "PAYLOAD_SIZE";
})(ProtectEventPacketHeader || (ProtectEventPacketHeader = {}));
/*
// A complete description of the UniFi Protect realtime update events API payload packet JSONs.
// Payload JSON for modelKey: event action: add
type ProtectNvrUpdatePayloadEventAdd = {

  camera: string,
  id: string,
  modelKey: string,
  partition: null,
  score: number,
  smartDetectEvents: string[],
  smartDetectTypes: string[],
  start: number,
  type: string
}

// Payload JSON for modelKey: camera action: update
type ProtectNvrUpdatePayloadCameraUpdate = {
  isMotionDetected: boolean,
  lastMotion: number,
  lastRing: number,
  lcdMessage: ProtectCameraLcdMessagePayload
}
*/
/**
 * UniFi Protect event utility class that provides functions for decoding realtime event API packet frames.
 */
// A utility class for decoding UniFi Protect events.
export class ProtectApiEvents {
    /**
     * Decode a UniFi Protect event packet.
     *
     * @param log     - Logging functions to use.
     * @param packet  - Input packet to decode.
     *
     * @remarks A UniFi Protect event packet is an encoded representation of state updates that occur in a UniFi Protect controller. This utility function takes an
     *   encoded packet as an input, and decodes it into an event header and payload that can be acted upon. Events are generated automatically once a successful
     *   login has been made to a Protect controller and can be accessed by listening to `message` events emitted by an instance of {@link ProtectApi}.
     */
    // Process an update data packet and return the action and payload.
    static decodePacket(log, packet) {
        // What we need to do here is to split this packet into the header and payload, and decode them.
        let dataOffset;
        try {
            // The fourth byte holds our payload size. When you add the payload size to our header frame size, you get the location of the
            // data header frame.
            dataOffset = packet.readUInt32BE(ProtectEventPacketHeader.PAYLOAD_SIZE) + EVENT_PACKET_HEADER_SIZE;
            // Validate our packet size, just in case we have more or less data than we expect. If we do, we're done for now.
            if (packet.length !== (dataOffset + EVENT_PACKET_HEADER_SIZE + packet.readUInt32BE(dataOffset + ProtectEventPacketHeader.PAYLOAD_SIZE))) {
                throw new Error("Packet length doesn't match header information.");
            }
        }
        catch (error) {
            log.error("Realtime events API: error decoding update packet: %s.", error);
            return null;
        }
        // Decode the action and payload frames now that we know where everything is.
        const headerFrame = this.decodeFrame(log, packet.slice(0, dataOffset), ProtectEventPacketType.HEADER);
        const payloadFrame = this.decodeFrame(log, packet.slice(dataOffset), ProtectEventPacketType.PAYLOAD);
        if (!headerFrame || !payloadFrame) {
            return null;
        }
        return ({ header: headerFrame, payload: payloadFrame });
    }
    // Decode a frame, composed of a header and payload, received through the update events API.
    static decodeFrame(log, packet, packetType) {
        // Read the packet frame type.
        const frameType = packet.readUInt8(ProtectEventPacketHeader.TYPE);
        // This isn't the frame type we were expecting - we're done.
        if (packetType !== frameType) {
            return null;
        }
        // Read the payload format.
        const payloadFormat = packet.readUInt8(ProtectEventPacketHeader.PAYLOAD_FORMAT);
        // Check to see if we're compressed or not, and inflate if needed after skipping past the 8-byte header.
        const payload = packet.readUInt8(ProtectEventPacketHeader.DEFLATED) ? zlib.inflateSync(packet.slice(EVENT_PACKET_HEADER_SIZE)) : packet.slice(EVENT_PACKET_HEADER_SIZE);
        // If it's a header, it can only have one format.
        if (frameType === ProtectEventPacketType.HEADER) {
            return (payloadFormat === EventPayloadType.JSON) ? JSON.parse(payload.toString()) : null;
        }
        // Process the payload format accordingly.
        switch (payloadFormat) {
            case EventPayloadType.JSON:
                // If it's data payload, it can be anything.
                return JSON.parse(payload.toString());
                break;
            case EventPayloadType.STRING:
                return payload.toString("utf8");
                break;
            case EventPayloadType.BUFFER:
                return payload;
                break;
            default:
                log.error("Unknown payload packet type received in the realtime events API: %s.", payloadFormat);
                return null;
                break;
        }
    }
}
//# sourceMappingURL=protect-api-events.js.map