/// <reference types="node" />
/// <reference types="node" />
import { RequestOptions, Response } from "@adobe/fetch";
import { ProtectCameraConfig, ProtectCameraConfigInterface, ProtectCameraConfigPayload, ProtectChimeConfig, ProtectChimeConfigPayload, ProtectLightConfig, ProtectLightConfigPayload, ProtectNvrBootstrap, ProtectNvrConfig, ProtectNvrConfigPayload, ProtectSensorConfig, ProtectSensorConfigPayload, ProtectViewerConfig, ProtectViewerConfigPayload } from "./protect-types.js";
import { EventEmitter } from "node:events";
import { ProtectLivestream } from "./protect-api-livestream.js";
import { ProtectLogging } from "./protect-logging.js";
export type ProtectKnownDeviceTypes = ProtectCameraConfig | ProtectChimeConfig | ProtectLightConfig | ProtectNvrConfig | ProtectSensorConfig | ProtectViewerConfig;
export type ProtectKnownDevicePayloads = ProtectCameraConfigPayload | ProtectChimeConfigPayload | ProtectLightConfigPayload | ProtectNvrConfigPayload | ProtectSensorConfigPayload | ProtectViewerConfigPayload;
/**
 * The UniFi Protect API is largely undocumented and has been reverse engineered mostly through
 * the web interface, and trial and error.
 *
 * Here's how the UniFi Protect API works:
 *
 * 1. {@link login | Login} to the UniFi Protect controller and acquire security credentials for further calls to the API.
 *
 * 2. Enumerate the list of UniFi Protect devices by calling the {@link bootstrap} endpoint. This contains everything you would want to know about this particular
 *    UniFi Protect controller, including enumerating all the devices it knows about.
 *
 * 3. Listen for `message` events emitted by {@link ProtectApi} containing all Protect controller events, in realtime. They are delivered as {@link ProtectEventPacket}
 *    packets, containing the event-specific details.
 *
 * Those are the basics that gets us up and running.
 */
export declare class ProtectApi extends EventEmitter {
    private _bootstrap;
    private _eventsWs;
    private apiErrorCount;
    private apiLastSuccess;
    private fetch;
    private headers;
    private _isAdminUser;
    private log;
    private nvrAddress;
    private password;
    private username;
    /**
     * Create an instance of the UniFi Protect API.
     *
     * @param log - Logging functions to use.
     *
     * @defaultValue `none` - Logging will be done to stdout and stderr.
     */
    constructor(log?: ProtectLogging);
    /**
     * Execute a login attempt to the UniFi Protect API.
     *
     * @param nvrAddress - Address of the UniFi Protect controller, expressed as an FQDN or IP address.
     * @param username   - Username to use when logging into the controller.
     * @param password   - Password to use when logging into the controller.
     *
     * @returns Returns a promise that will resolve to `true` if successful and `false` otherwise.
     *
     * @remarks A `login` event will be emitted each time this method is called, with the result of the attempt as an argument.
     *
     * @example
     * Login to the Protect controller. You can selectively choose to either `await` the promise that is returned by `login`, or subscribe to the `login` event.
     *
     * ```ts
     * import { ProtectApi } from "unifi-protect";
     *
     * // Create a new Protect API instance.
     * const ufp = new ProtectApi();
     *
     * // Set a listener to wait for the login event to occur.
     * ufp.once("login", (successfulLogin: boolean) => {
     *
     *   // Indicate if we are successful.
     *   if(successfulLogin) {
     *
     *     console.log("Logged in successfully.");
     *     process.exit(0);
     *   }
     * });
     *
     * // Login to the Protect controller.
     * if(!(await ufp.login("protect-controller.local", "username", "password"))) {
     *
     *   console.log("Invalid login credentials.");
     *   process.exit(0);
     * };
     * ```
     */
    login(nvrAddress: string, username: string, password: string): Promise<boolean>;
    private loginController;
    private bootstrapController;
    private launchEventsWs;
    /**
     * Retrieve the bootstrap JSON from a UniFi Protect controller.
     *
     * @returns Returns a promise that will resolve to `true` if successful and `false` otherwise.
     *
     * @remarks A `bootstrap` event will be emitted each time this method is successfully called, with the {@link ProtectNvrBootstrap} JSON as an argument.
     *
     * @example
     * Retrieve the bootstrap JSON. You can selectively choose to either `await` the promise that is returned by `getBootstrap`, or subscribe to the `bootstrap` event.
     *
     * ```ts
     * import { ProtectApi, ProtectNvrBootstrap } from "unifi-protect";
     * import util from "node:util";
     *
     * // Create a new Protect API instance.
     * const ufp = new ProtectApi();
     *
     * // Set a listener to wait for the bootstrap event to occur.
     * ufp.once("bootstrap", (bootstrapJSON: ProtectNvrBootstrap) => {
     *
     *   // Once we've bootstrapped the Protect controller, output the bootstrap JSON and we're done.
     *   process.stdout.write(util.inspect(bootstrapJSON, { colors: true, depth: null, sorted: true }) + "\n", () => process.exit(0));
     * });
     *
     * // Login to the Protect controller.
     * if(!(await ufp.login("protect-controller.local", "username", "password"))) {
     *
     *   console.log("Invalid login credentials.");
     *   process.exit(0);
     * };
     *
     * // Bootstrap the controller. It will emit a message once it's received the bootstrap JSON, or you can alternatively wait for the promise to resolve.
     * if(!(await ufp.getBootstrap())) {
     *
     *   console.log("Unable to bootstrap the Protect controller.");
     *   process.exit(0);
     * }
     * ```
     *
     * Alternatively, you can access the bootstrap JSON directly through the {@link bootstrap} accessor:
     *
     * ```ts
     * import { ProtectApi } from "unifi-protect";
     * import util from "node:util";
     *
     * // Create a new Protect API instance.
     * const ufp = new ProtectApi();
     *
     * // Login to the Protect controller.
     * if(!(await ufp.login("protect-controller.local", "username", "password"))) {
     *
     *   console.log("Invalid login credentials.");
     *   process.exit(0);
     * };
     *
     * // Bootstrap the controller.
     * if(!(await ufp.getBootstrap())) {
     *
     *   console.log("Unable to bootstrap the Protect controller.");
     *   process.exit(0);
     * }
     *
     * // Once we've bootstrapped the Protect controller, access the bootstrap JSON through the bootstrap accessor and we're done.
     * process.stdout.write(util.inspect(ufp.bootstrap, { colors: true, depth: null, sorted: true }) + "\n", () => process.exit(0));
     * ```
     *
     */
    getBootstrap(): Promise<boolean>;
    private checkAdminUserStatus;
    /**
     * Retrieve a snapshot image from a Protect camera.
     *
     * @param device           - Protect device.
     * @param width            - Optionally specify the image width to request. Defaults selected by the Protect controller, based on the camera resolution.
     * @param height           - Optionally specify the image height to request. Defaults selected by the Protect controller, based on the camera resolution.
     * @param timestamp        - Optionally specify the timestamp index to retrieve. Defaults to the current time.
     * @param usePackageCamera - Optionally specify retrieving a snapshot fron the package camera, rather than the primary camera lens. Defaults to `false`.
     *
     * @returns Returns a promise that will resolve to a Buffer containing the JPEG image snapshot if successful, and `null` otherwise.
     */
    getSnapshot(device: ProtectCameraConfig, width?: number, height?: number, timestamp?: number, usePackageCamera?: boolean): Promise<Buffer | null>;
    /**
     * Update a Protect device's configuration on the UniFi Protect controller.
     *
     * @typeParam DeviceType - Generic for any known Protect device type.
     *
     * @param device  - Protect device.
     * @param payload - Device configuration payload to upload, usually a subset of the device-specific configuration JSON.
     *
     * @returns Returns a promise that will resolve to the updated device-specific configuration JSON if successful, and `null` otherwise.
     *
     * @remarks Use this method to change the configuration of a given Protect device or controller. It requires the credentials used to login to the Protect API
     *   to have administrative privileges for most settings.
     */
    updateDevice<DeviceType extends ProtectKnownDeviceTypes>(device: DeviceType, payload: ProtectKnownDevicePayloads): Promise<DeviceType | null>;
    private updateCameraChannels;
    /**
     * Utility method that enables all RTSP channels on a given Protect camera.
     *
     * @param device - Protect camera to modify.
     *
     * @returns Returns a promise that will resolve to the updated {@link ProtectCameraConfig} if successful, and `null` otherwise.
     */
    enableRtsp(device: ProtectCameraConfigInterface): Promise<ProtectCameraConfig | null>;
    /**
     * Utility method that generates a nicely formatted device information string.
     *
     * @param device     - Protect device.
     * @param name       - Optional name for the device. Defaults to the device type (e.g. `G4 Pro`).
     * @param deviceInfo - Optionally specify whether or not to include the IP address and MAC address in the returned string. Defaults to `false`.
     *
     * @returns Returns the Protect device name in the following format: <code>*Protect device name* [*Protect device type*] (address: *IP address* mac: *MAC address*)</code>.
     *
     * @remarks The example above assumed the `deviceInfo` parameter is set to `true`.
     */
    getDeviceName(device: ProtectKnownDeviceTypes, name?: string, deviceInfo?: boolean): string;
    /**
     * Utility method that generates a combined, nicely formatted device and NVR string.
     *
     * @param device - Protect device.
     *
     * @returns Returns the Protect device name in the following format:
     *   <code>*Protect controller name* [*Protect controller type*] *Protect device name* [*Protect device type*]</code>.
     */
    getFullName(device: ProtectKnownDeviceTypes): string;
    /**
     * Terminate any open connection to the UniFi Protect API.
     */
    reset(): void;
    /**
     * Clear the login credentials and terminate any open connection to the UniFi Protect API.
     */
    logout(): void;
    private canModifyCamera;
    /**
     * Return a websocket API endpoint for the requested endpoint type.
     *
     * @param endpoint - Requested endpoint type. Valid types are `livestream` and `talkback`.
     * @param params   - Parameters to pass on for the endpoint request.
     *
     * @returns Returns a promise that will resolve to a URL to the requested endpoint if successful, and `null` otherwise.
     *
     * @remarks Valid API endpoints are `livestream` and `talkback`.
     *
     * * The `livestream` endpoint will return a URL to a websocket that provides an encoded livestream from a given camera. **Do not access this endpoint directly, use
     *   {@link createLivestream} instead.** Accessing the livestream endpoint directly is not directly useful without additional manipulation, which, unless you have
     *   a need for, you should avoid dealing with and use the {@link ProtectLivestream} API instead that provides you direct access to the livestream as an H.264 fMP4.
     * * The `talkback` endpoint creates a talkback connection to a Protect camera that contains a speaker (e.g. Protect doorbells).
     *   The returned websocket accepts an AAC-encoded ADTS stream. The only valid parameter is `camera`, containing the ID of the Protect camera you want to connect to.
     */
    getWsEndpoint(endpoint: "livestream" | "talkback", params?: URLSearchParams): Promise<string | null>;
    private _getWsEndpoint;
    /**
     * Execute an HTTP fetch request to the Protect controller.
     *
     * @param url       - Requested endpoint type. Valid types are `livestream` and `talkback`.
     * @param options   - Parameters to pass on for the endpoint request.
     * @param logErrors - Log errors that aren't already accounted for and handled, rather than failing silently. Defaults to `true`.
     *
     * @returns Returns a promise that will resolve to a Response object successful, and `null` otherwise.
     *
     * @remarks This method should be used when direct access to the Protect controller is needed, or when this library doesn't have a needed method to access
     *   controller capabilities.
     */
    retrieve(url: string, options?: RequestOptions, logErrors?: boolean): Promise<Response | null>;
    private _retrieve;
    private logRetry;
    /**
     * Return a new instance of the Protect livestream API.
     *
     * @returns Returns a new livestream API object.
     *
     * @remarks This method should be used to create a new livestream API object. It allows you to create access livestreams of individual cameras and interact
     *   directly with the H.264 fMP4 streams for a given camera.
     */
    createLivestream(): ProtectLivestream;
    /**
     * Return an API endpoint for the requested endpoint type.
     *
     * @param endpoint - Requested endpoint type.
     *
     * @returns Returns a URL to the requested endpoint if successful, and an empty string otherwise.
     *
     * @remarks Valid API endpoints are `bootstrap`, `camera`, `chime`, `light`, `login`, `nvr`, `self`, `sensor`, `websocket` and `viewer`.
     */
    getApiEndpoint(endpoint: string): string;
    /**
     * Access the Protect controller bootstrap JSON.
     *
     * @returns Returns the bootstrap JSON if the Protect controller has been bootstrapped, `null` otherwise.
     */
    get bootstrap(): ProtectNvrBootstrap | null;
    /**
     * Utility method that returns whether the credentials that were used to login to the Protect controller have administrative privileges or not.
     *
     * @returns Returns `true` if the logged in user has administrative privileges, `false` otherwise.
     */
    get isAdminUser(): boolean;
    /**
     * Utility method that returns a nicely formatted version of the Protect controller name.
     *
     * @returns Returns the Protect controller name in the following format:
     *   <code>*Protect controller name* [*Protect controller type*]</code>.
     */
    get name(): string;
}
