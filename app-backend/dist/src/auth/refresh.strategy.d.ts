declare const RefreshJwtStrategy_base: new (...args: any) => any;
export declare class RefreshJwtStrategy extends RefreshJwtStrategy_base {
    constructor();
    validate(payload: {
        sub: string;
    }): Promise<{
        userId: string;
    }>;
}
export {};
