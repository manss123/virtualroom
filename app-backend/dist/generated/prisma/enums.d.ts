export declare const PrePostType: {
    readonly PRE: "PRE";
    readonly POST: "POST";
};
export type PrePostType = (typeof PrePostType)[keyof typeof PrePostType];
export declare const QuestionnaireType: {
    readonly PDPA_CONSENT: "PDPA_CONSENT";
    readonly PRE_TEST: "PRE_TEST";
    readonly PRE_SURVEY: "PRE_SURVEY";
    readonly POST_TEST: "POST_TEST";
    readonly POST_SURVEY: "POST_SURVEY";
};
export type QuestionnaireType = (typeof QuestionnaireType)[keyof typeof QuestionnaireType];
export declare const QuestionnaireStatusState: {
    readonly NOT_STARTED: "NOT_STARTED";
    readonly IN_PROGRESS: "IN_PROGRESS";
    readonly COMPLETED: "COMPLETED";
};
export type QuestionnaireStatusState = (typeof QuestionnaireStatusState)[keyof typeof QuestionnaireStatusState];
