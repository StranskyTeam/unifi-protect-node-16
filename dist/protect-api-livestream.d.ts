/// <reference types="node" />
/// <reference types="node" />
import { EventEmitter } from "node:events";
import { ProtectApi } from "./protect-api.js";
import { ProtectLogging } from "./protect-logging.js";
export declare class ProtectLivestream extends EventEmitter {
    private _initSegment;
    private api;
    private errorHandler;
    private log;
    private segmentHandler;
    private ws;
    constructor(api: ProtectApi, log: ProtectLogging);
    start(cameraId: string, channel: number, lens?: number, segmentLength?: number, requestId?: string): Promise<boolean>;
    stop(): void;
    private launchLivestream;
    private processLivestream;
    getInitSegment(): Promise<Buffer>;
    get initSegment(): Buffer | null;
}
