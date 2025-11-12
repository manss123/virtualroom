export declare const PrePostType: {
    readonly PRE: "PRE";
    readonly POST: "POST";
};
export type PrePostType = (typeof PrePostType)[keyof typeof PrePostType];
