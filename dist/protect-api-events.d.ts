/// <reference types="node" />
import { ProtectLogging } from "./protect-logging.js";
/**
 * UniFi Protect event packet.
 *
 * @param header   - Protect event header.
 * @param payload  - Protect event payload.
 *
 * @remarks A UniFi Protect event packet represents a realtime event update from a UniFi Protect controller. There are two components to each packet, a `header` and
 *   a `payload`. The `header` contains information about which Protect device and what action category it belongs to. The `payload` contains the detailed information
 *   related to the device and action specified in the header.
 */
export type ProtectEventPacket = {
    header: ProtectEventHeader;
    payload: unknown;
};
/**
 * UniFi Protect event header.
 *
 * @param header   - Protect event header.
 * @param payload  - Protect event payload.
 *
 * @remarks A UniFi Protect event packet represents a realtime event update from a UniFi Protect controller. There are two components to each packet, a `header` and
 *   a `payload`. The `header` contains information about which Protect device and what action category it belongs to. The `payload` contains the detailed information
 *   related to the device and action specified in the header.
 */
export type ProtectEventHeader = {
    action: string;
    id: string;
    modelKey: string;
    newUpdateId: string;
};
/**
 * UniFi Protect event utility class that provides functions for decoding realtime event API packet frames.
 */
export declare class ProtectApiEvents {
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
    static decodePacket(log: ProtectLogging, packet: Buffer): ProtectEventPacket | null;
    private static decodeFrame;
}
