export interface ProtectLogging {
    debug(message: string, ...parameters: unknown[]): void;
    error(message: string, ...parameters: unknown[]): void;
    info(message: string, ...parameters: unknown[]): void;
    warn(message: string, ...parameters: unknown[]): void;
}
