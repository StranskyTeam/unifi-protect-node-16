export interface ProtectNvrBootstrapInterface {
    accessKey: string;
    authUserId: string;
    bridges: unknown[];
    cameras: ProtectCameraConfig[];
    chimes: ProtectChimeConfig[];
    cloudPortalUrl: string;
    groups: unknown[];
    lastUpdateId: string;
    lights: ProtectLightConfig[];
    liveviews: ProtectNvrLiveviewConfig[];
    nvr: ProtectNvrConfig;
    sensors: ProtectSensorConfig[];
    users: ProtectNvrUserConfig[];
    viewers: ProtectViewerConfig[];
}
export interface ProtectNvrConfigInterface {
    analyticsData: string;
    anonymouseDeviceId: string;
    availableUpdate: string;
    avgMotions: number[];
    cameraUtilization: number;
    canAutoUpdate: boolean;
    disableAudio: boolean;
    disableAutoLink: boolean;
    doorbellSettings: {
        defaultMessageText: string;
        defaultMessageResetTimeoutMs: number;
        customMessages: string[];
        allMessages: {
            type: string;
            text: string;
        }[];
    };
    enableAutomaticBackups: boolean;
    enableBridgeAutoAdoption: boolean;
    enableCrashReporting: boolean;
    enableStatsReporting: boolean;
    errorCode: string | null;
    featureFlags: {
        beta: boolean;
        dev: boolean;
        notificationsV2: boolean;
    };
    firmwareVersion: string;
    hardwareId: string;
    hardwarePlatform: string;
    hardwareRevision: string;
    host: string;
    hostShortname: string;
    hostType: string;
    hosts: string[];
    id: string;
    isAway: boolean;
    isHardware: boolean;
    isRecordingDisabled: boolean;
    isRecordingMotionOnly: boolean;
    isRecycling: boolean;
    isSetup: boolean;
    isSshEnabled: boolean;
    isStation: boolean;
    isStatsGatheringEnabled: boolean;
    isUpdating: boolean;
    isWirelessUplinkEnabled: boolean;
    lastSeen: number;
    lastUpdateAt: number | null;
    locationSettings: {
        isAway: boolean;
        isGeofencingEnabled: boolean;
        latitude: number;
        longitude: number;
        radius: number;
    };
    mac: string;
    marketName: string;
    maxCameraCapacity: Record<string, number>;
    modelKey: string;
    name: string;
    network: string;
    ports: {
        cameraEvents: number;
        cameraHttps: number;
        cameraTcp: number;
        devicesWss: number;
        discoveryClient: number;
        emsCLI: number;
        emsLiveFLV: number;
        http: number;
        https: number;
        liveWs: number;
        liveWss: number;
        playback: number;
        rtmp: number;
        rtsp: number;
        rtsps: number;
        tcpBridge: number;
        tcpStreams: number;
        ucore: number;
        ump: number;
    };
    recordingRetentionDurationMs: string;
    releaseChannel: string;
    skipFirmwareUpdate: boolean;
    smartDetectAgreement: {
        lastUpdateAt: number | null;
        status: string;
    };
    ssoChannel: string | null;
    storageStats: unknown;
    systemInfo: ProtectNvrSystemInfoInterface;
    temperatureUnit: string;
    timeFormat: string;
    timezone: string;
    type: string;
    ucoreVersion: string;
    uiVersion: string;
    upSince: number;
    uptime: number;
    version: string;
    wifiSettings: {
        password: string | null;
        ssid: string | null;
        useThirdPartyWifi: boolean;
    };
}
export interface ProtectNvrSystemInfoInterface {
    cpu: {
        averageLoad: number;
        temperature: number;
    };
    memory: {
        available: number;
        free: number;
        total: number;
    };
    storage: {
        available: number;
        devices: {
            healthy: boolean;
            model: string;
            size: number;
        }[];
        isRecycling: boolean;
        size: number;
        type: string;
        used: number;
    };
    tmpfs: {
        available: number;
        path: string;
        total: number;
        used: number;
    };
}
export interface ProtectCameraConfigInterface {
    apMac: string;
    apRssi: string;
    audioBitrate: number;
    canManage: boolean;
    channels: ProtectCameraChannelConfigInterface[];
    chimeDuration: number;
    connectedSince: number;
    connectionHost: string;
    elementInfo: null;
    featureFlags: {
        canAdjustIrLedLevel: boolean;
        canMagicZoom: boolean;
        canOpticalZoom: boolean;
        canTouchFocus: boolean;
        hasAccelerometer: boolean;
        hasAec: boolean;
        hasAutoICROnly: boolean;
        hasBattery: boolean;
        hasBluetooth: boolean;
        hasChime: boolean;
        hasExternalIr: boolean;
        hasHdr: boolean;
        hasIcrSensitivity: boolean;
        hasLcdScreen: boolean;
        hasLdc: boolean;
        hasLedIr: boolean;
        hasLedStatus: boolean;
        hasLineIn: boolean;
        hasMic: boolean;
        hasMotionZones: boolean;
        hasNewMotionAlgorithm: boolean;
        hasPackageCamera: boolean;
        hasPrivacyMask: boolean;
        hasRtc: boolean;
        hasSdCard: boolean;
        hasSmartDetect: boolean;
        hasSquareEventThumbnail: boolean;
        hasSpeaker: boolean;
        hasWifi: boolean;
        isDoorbell: boolean;
        motionAlgorithms: string[];
        privacyMaskCapability: {
            maxMasks: number;
            rectangleOnly: boolean;
        };
        smartDetectTypes: string[];
        videoModeMaxFps: number[];
        videoModes: string[];
    };
    firmwareBuild: string;
    firmwareVersion: string;
    hardwareRevision: string;
    hasSpeaker: boolean;
    hasWifi: boolean;
    hdrMode: boolean;
    host: string;
    id: string;
    isAdopted: boolean;
    isAdoptedByOther: boolean;
    isAdopting: boolean;
    isAttemptingToConnect: boolean;
    isConnected: boolean;
    isDark: boolean;
    isDeleting: boolean;
    isHidden: boolean;
    isLiveHeatmapEnabled: boolean;
    isManaged: boolean;
    isMicEnabled: boolean;
    isMotionDetected: boolean;
    isProbingForWifi: boolean;
    isProvisioned: boolean;
    isRebooting: boolean;
    isRecording: boolean;
    isSshEnabled: boolean;
    isUpdating: boolean;
    ispSettings: {
        aeMode: string;
        brightness: number;
        contrast: number;
        dZoomCenterX: number;
        dZoomCenterY: number;
        dZoomScale: number;
        dZoomStreamId: number;
        denoise: number;
        focusMode: string;
        focusPosition: number;
        hue: number;
        icrSensitivity: number;
        irLedLevel: number;
        irLedMode: string;
        is3dnrEnabled: boolean;
        isAggressiveAntiFlickerEnabled: boolean;
        isAutoRotateEnabled: boolean;
        isExternalIrEnabled: boolean;
        isFlippedHorizontal: boolean;
        isFlippedVertical: boolean;
        isLdcEnabled: boolean;
        isPauseMotionEnabled: boolean;
        saturation: number;
        sharpness: number;
        touchFocusX: number;
        touchFocusY: number;
        wdr: number;
        zoomPosition: number;
    };
    lastMotion: number;
    lastRing: number | null;
    lastSeen: number;
    latestFirmwareVersion: string;
    lcdMessage: ProtectCameraLcdMessageConfigInterface;
    ledSettings: {
        blinkRate: number;
        isEnabled: boolean;
    };
    lenses: {
        id: number;
        video: {
            recordingEnd: number | null;
            recordingEndLQ: number | null;
            recordingStart: number | null;
            recordingStartLQ: number | null;
            timelapseEnd: number | null;
            timelapseEndLQ: number | null;
            timelapseStart: number | null;
            timelapseStartLQ: number | null;
        };
    }[];
    mac: string;
    marketName: string;
    micVolume: number;
    modelKey: string;
    name: string;
    osdSettings: {
        isDateEnabled: boolean;
        isDebugEnabled: boolean;
        isLogoEnabled: boolean;
        isNameEnabled: boolean;
    };
    phyRate: number;
    pirSettings: {
        pirMotionClipLength: number;
        pirSensitivity: number;
        timelapseFrameInterval: number;
        timelapseTransferInterval: number;
    };
    platform: string;
    recordingSchedule: null;
    recordingSettings: {
        enablePirTimelapse: boolean;
        endMotionEventDelay: number;
        geofencing: string;
        minMotionEventTrigger: number;
        mode: string;
        postPaddingSecs: number;
        prePaddingSecs: number;
        retentionDurationMs: number | null;
        suppressIlluminationSurge: boolean;
        useNewMotionAlgorithm: boolean;
    };
    smartDetectLines: [];
    smartDetectSettings: {
        objectTypes: string[];
    };
    smartDetectZones: {
        color: string;
        name: string;
        objectTypes: string[];
        points: [number, number][];
        sensitivity: number;
    }[];
    speakerSettings: {
        areSystemSoundsEnabled: boolean;
        isEnabled: boolean;
        volume: number;
    };
    state: string;
    stats: {
        battery: {
            isCharging: boolean;
            percentage: number | null;
            sleepState: string;
        };
        rxBytes: number;
        storage: {
            rate: number;
            used: number;
        };
        txBytes: number;
        video: {
            recordingEnd: number;
            recordingEndLQ: number;
            recordingStart: number;
            recordingStartLQ: number;
            timelapseEnd: number;
            timelapseEndLQ: number;
            timelapseStart: number;
            timelapseStartLQ: number;
        };
        wifi: {
            channel: number | null;
            frequency: number | null;
            linkSpeedMbps: number | null;
            signalQuality: number;
            signalStrength: number;
        };
        wifiQuality: number;
        wifiStrength: number;
    };
    talkbackSettings: {
        bindAddr: string;
        bindPort: number;
        bitsPerSample: number;
        channels: number;
        filterAddr: string;
        filterPort: number;
        typeFmt: string;
        typeIn: string;
        quality: number;
        samplingRate: number;
    };
    type: string;
    upSince: number;
    wifiConnectionState: {
        channel: number;
        frequency: number;
        phyRate: number;
        signalQuality: number;
        signalStrength: number;
    };
    wiredConnectionState: {
        phyRate: number;
    };
}
export interface ProtectCameraChannelConfigInterface {
    bitrate: number;
    enabled: boolean;
    fps: number;
    fpsValues: number[];
    height: number;
    id: number;
    idrInterval: number;
    isRtspEnabled: boolean;
    maxBitrate: number;
    minBitrate: number;
    minClientAdaptiveBitRate: number;
    minMotionAdaptiveBitRate: number;
    name: string;
    rtspAlias: string;
    videoId: string;
    width: number;
}
export interface ProtectCameraLcdMessageConfigInterface {
    duration: number;
    resetAt: number | null;
    text: string;
    type: string;
}
export interface ProtectChimeConfigInterface {
    apMac: string;
    apMgmtIp: string;
    apRssi: string;
    cameraIds: string[];
    canAdopt: boolean;
    connectedSince: number;
    connectionHost: string;
    elementInfo: string;
    featureFlags: {
        hasWifi: boolean;
    };
    firmwareBuild: string;
    firmwareVersion: string;
    fwUpdateState: string;
    hardwareRevision: string;
    host: string;
    id: string;
    isAdopted: boolean;
    isAdoptedByOther: boolean;
    isAdopting: boolean;
    isAttemptingToConnect: boolean;
    isConnected: boolean;
    isDownloadingFW: boolean;
    isProbingForWifi: boolean;
    isProvisioned: boolean;
    isRebooting: boolean;
    isSshEnabled: boolean;
    isUpdating: boolean;
    isWirelessUplinkEnabled: boolean;
    lastRing: number;
    lastSeen: number;
    latestFirmwareVersion: string;
    mac: string;
    marketName: string;
    modelKey: string;
    name: string;
    state: string;
    type: string;
    upSince: number;
    uptime: number;
    volume: number;
    wifiConnectionState: {
        apName: string | null;
        bssid: string | null;
        channel: string | null;
        connectivity: string;
        experience: null;
        frequency: null;
        phyRate: number;
        signalQuality: number;
        signalStrength: number;
        ssid: string | null;
        txRate: null;
    };
    wiredConnectionState: {
        phyRate: number;
    };
}
export interface ProtectLightConfigInterface {
    camera: string;
    canAdopt: boolean;
    connectedSince: number;
    connectionHost: string;
    firmwareBuild: string;
    firmwareVersion: string;
    hardwareRevision: string;
    host: string;
    id: string;
    isAdopted: boolean;
    isAdoptedByOther: boolean;
    isAdopting: boolean;
    isAttemptingToConnect: boolean;
    isCameraPaired: boolean;
    isConnected: boolean;
    isDark: boolean;
    isLightOn: boolean;
    isLocating: boolean;
    isPirMotionDetected: boolean;
    isProvisioned: boolean;
    isRebooting: boolean;
    isSshEnabled: boolean;
    isUpdating: boolean;
    lastMotion: number;
    lastSeen: number;
    latestFirmwareVersion: string;
    lightDeviceSettings: {
        isIndicatorEnabled: boolean;
        ledLevel: number;
        luxSensitivity: string;
        pirDuration: number;
        pirSensitivity: number;
    };
    lightModeSettings: {
        enableAt: string;
        mode: string;
    };
    lightOnSettings: {
        isLedForceOn: boolean;
    };
    mac: string;
    marketName: string;
    modelKey: string;
    name: string;
    state: string;
    type: string;
    upSince: number;
    uptime: number;
    wiredConnectionState: {
        phyRate: number;
    };
}
export interface ProtectNvrLiveviewConfigInterface {
    id: string;
    isDefault: boolean;
    isGlobal: boolean;
    layout: number;
    modelKey: string;
    name: string;
    owner: string;
    slots: {
        cameras: string[];
        cycleInterval: number;
        cycleMode: string;
    }[];
}
export interface ProtectNvrUserConfigInterface {
    alertRules: unknown[];
    allPermissions: string[];
    cloudAccount: string;
    email: string;
    enableNotifications: boolean;
    firstName: string;
    groups: string[];
    hasAcceptedInvite: boolean;
    id: string;
    isOwner: boolean;
    lastLoginIp: string;
    lastLoginTime: number;
    lastName: string;
    localUsername: string;
    location: {
        isAway: boolean;
        latitude: string;
        longitude: string;
    };
    modelKey: string;
    name: string;
    permissions: string[];
    role: string;
    settings: {
        flags: string[];
    };
    syncSso: boolean;
}
export interface ProtectNvrSystemEventInterface {
    apps: {
        apps: unknown[];
        controllers: ProtectNvrSystemEventController[];
    };
    system: unknown;
    type: string;
}
export interface ProtectNvrSystemEventControllerInterface {
    harddriveRequired: boolean;
    info: {
        events: number[];
        isAdopted: boolean;
        isConnectedToCloud: boolean;
        isSetup: boolean;
        lastMotion: number;
        lastMotionCamera: string;
        lastMotionCameraAddress: string;
        lastMotionCameraModel: string;
        managedCameras: number;
        offlineCameras: number;
        oldestRecording: number;
        onlineCameras: number;
        recordingSpaceTotal: number;
        recordingSpaceUsed: number;
        retentionTime: number;
        startedAt: number;
        throughput: number;
        timeFormat: string;
        updateAvailable: boolean;
        updateVersion: string;
    };
    installState: string;
    isConfigured: boolean;
    isInstalled: boolean;
    isRunning: boolean;
    name: string;
    port: number;
    required: boolean;
    state: string;
    status: string;
    statusMessage: string;
    swaiVersion: number;
    type: string;
    ui: {
        apiPrefix: string;
        baseUrl: string;
        cdnPublicPaths: string[];
        entrypoint: string;
        hotkey: string;
        icon: string;
        publicPath: string;
        swaiVersion: number;
    };
    uiNpmPackageName: string;
    uiVersion: string;
    unadoptedDevices: unknown[];
    updateAvailable: string;
    version: string;
}
export interface ProtectSensorConfigInterface {
    alarmSettings: {
        isEnabled: boolean;
    };
    alarmTriggeredAt: number | null;
    batteryStatus: {
        isLow: boolean;
        percentage: number;
    };
    bluetoothConnectionState: {
        signalQuality: number;
        signalStrength: number;
    };
    bridge: string;
    bridgeCandidates: [];
    camera: string;
    canAdopt: boolean;
    connectedSince: number;
    connectionHost: string;
    firmwareBuild: string;
    firmwareVersion: string;
    hardwareRevision: string;
    humiditySettings: {
        highThreshold: number;
        isEnabled: boolean;
        lowThreshold: number;
        margin: number;
    };
    id: string;
    isAdopted: boolean;
    isAdoptedByOther: boolean;
    isAdopting: boolean;
    isAttemptingToConnect: boolean;
    isConnected: boolean;
    isMotionDetected: boolean;
    isOpened: boolean;
    isProvisioned: boolean;
    isRebooting: boolean;
    isSshEnabled: boolean;
    isUpdating: boolean;
    lastSeen: number;
    latestFirmwareVersion: string;
    leakDetectedAt: number;
    ledSettings: {
        isEnabled: boolean;
    };
    lightSettings: {
        highThreshold: number;
        isEnabled: boolean;
        lowThreshold: number;
        margin: number;
    };
    mac: string;
    marketName: string;
    modelKey: string;
    motionDetectedAt: number;
    motionSettings: {
        isEnabled: boolean;
        sensitivity: number;
    };
    mountType: string;
    name: string;
    openStatusChangedAt: number;
    state: string;
    stats: {
        humidity: {
            status: string;
            value: number | null;
        };
        light: {
            status: string;
            value: number | null;
        };
        temperature: {
            status: string;
            value: number | null;
        };
    };
    tamperingDetectedAt: number | null;
    temperatureSettings: {
        highThreshold: number;
        isEnabled: boolean;
        lowThreshold: number;
        margin: number;
    };
    type: string;
    upSince: number;
    uptime: number;
    wiredConnectionState: {
        phyRate: number;
    };
}
export interface ProtectViewerConfigInterface {
    canAdopt: boolean;
    connectedSince: number;
    connectionHost: string;
    firmwareBuild: string;
    firmwareVersion: string;
    hardwareRevision: string;
    host: string;
    id: string;
    isAdopted: boolean;
    isAdoptedByOther: boolean;
    isAdopting: boolean;
    isAttemptingToConnect: boolean;
    isConnected: boolean;
    isProvisioned: boolean;
    isRebooting: boolean;
    isSshEnabled: boolean;
    isUpdating: boolean;
    lastSeen: number;
    latestFirmwareVersion: string;
    liveview: string | null;
    mac: string;
    marketName: string;
    modelKey: string;
    name: string;
    softwareVersion: string;
    state: string;
    streamLimit: number;
    type: string;
    upSince: number;
    uptime: number;
    wiredConnectionState: {
        phyRate: number;
    };
}
export interface ProtectEventAddInterface {
    camera: string;
    end: number;
    id: string;
    metadata: ProtectEventMetadata;
    modelKey: string;
    partition: string;
    score: number;
    smartDetectEvents: string[];
    smartDetectTypes: string[];
    start: number;
    type: string;
    user: string;
}
export interface ProtectEventMetadataInterface {
    licensePlate: {
        confidenceLevel: number;
        name: string;
    };
}
/** @ignore */
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends Array<infer I> ? Array<DeepPartial<I>> : DeepPartial<T[P]>;
};
/** @interface */
export type ProtectEventAdd = Readonly<ProtectEventAddInterface>;
/** @interface */
export type ProtectEventMetadata = Readonly<ProtectEventMetadataInterface>;
/** @interface */
export type ProtectNvrBootstrap = Readonly<ProtectNvrBootstrapInterface>;
/** @interface */
export type ProtectNvrConfig = Readonly<ProtectNvrConfigInterface>;
/** @interface */
export type ProtectNvrConfigPayload = DeepPartial<ProtectNvrConfigInterface>;
/** @interface */
export type ProtectNvrSystemInfoConfig = Readonly<ProtectNvrSystemInfoInterface>;
/** @interface */
export type ProtectCameraConfig = Readonly<ProtectCameraConfigInterface>;
/** @interface */
export type ProtectCameraConfigPayload = DeepPartial<ProtectCameraConfigInterface>;
/** @interface */
export type ProtectCameraChannelConfig = Readonly<ProtectCameraChannelConfigInterface>;
/** @interface */
export type ProtectCameraLcdMessageConfig = Readonly<ProtectCameraLcdMessageConfigInterface>;
/** @interface */
export type ProtectCameraLcdMessagePayload = DeepPartial<ProtectCameraLcdMessageConfigInterface>;
/** @interface */
export type ProtectChimeConfig = Readonly<ProtectChimeConfigInterface>;
/** @interface */
export type ProtectChimeConfigPayload = DeepPartial<ProtectChimeConfigInterface>;
/** @interface */
export type ProtectLightConfig = Readonly<ProtectLightConfigInterface>;
/** @interface */
export type ProtectLightConfigPayload = DeepPartial<ProtectLightConfigInterface>;
/** @interface */
export type ProtectNvrLiveviewConfig = Readonly<ProtectNvrLiveviewConfigInterface>;
/** @interface */
export type ProtectNvrSystemEvent = Readonly<ProtectNvrSystemEventInterface>;
/** @interface */
export type ProtectNvrSystemEventController = Readonly<ProtectNvrSystemEventControllerInterface>;
/** @interface */
export type ProtectNvrUserConfig = Readonly<ProtectNvrUserConfigInterface>;
/** @interface */
export type ProtectSensorConfig = Readonly<ProtectSensorConfigInterface>;
/** @interface */
export type ProtectSensorConfigPayload = DeepPartial<ProtectSensorConfigInterface>;
/** @interface */
export type ProtectViewerConfig = Readonly<ProtectViewerConfigInterface>;
/** @interface */
export type ProtectViewerConfigPayload = DeepPartial<ProtectViewerConfigInterface>;
