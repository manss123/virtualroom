import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.AnyNull);
};
export declare const DbNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
export declare const JsonNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
export declare const AnyNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
export declare const ModelName: {
    readonly User: "User";
    readonly AuthIdentity: "AuthIdentity";
    readonly PrePostTest: "PrePostTest";
    readonly SelfRegAssessment: "SelfRegAssessment";
    readonly RoomPlan: "RoomPlan";
    readonly RoomStudyLog: "RoomStudyLog";
    readonly QuestionnaireStatus: "QuestionnaireStatus";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly firstName: "firstName";
    readonly lastName: "lastName";
    readonly sex: "sex";
    readonly age: "age";
    readonly school: "school";
    readonly grade: "grade";
    readonly refreshTokenHash: "refreshTokenHash";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly pdpaAccepted: "pdpaAccepted";
    readonly pdpaAcceptedAt: "pdpaAcceptedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const AuthIdentityScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly provider: "provider";
    readonly providerUserId: "providerUserId";
    readonly email: "email";
    readonly passwordHash: "passwordHash";
};
export type AuthIdentityScalarFieldEnum = (typeof AuthIdentityScalarFieldEnum)[keyof typeof AuthIdentityScalarFieldEnum];
export declare const PrePostTestScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly type: "type";
    readonly totalItems: "totalItems";
    readonly score: "score";
    readonly takenAt: "takenAt";
};
export type PrePostTestScalarFieldEnum = (typeof PrePostTestScalarFieldEnum)[keyof typeof PrePostTestScalarFieldEnum];
export declare const SelfRegAssessmentScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly totalItems: "totalItems";
    readonly score: "score";
    readonly takenAt: "takenAt";
};
export type SelfRegAssessmentScalarFieldEnum = (typeof SelfRegAssessmentScalarFieldEnum)[keyof typeof SelfRegAssessmentScalarFieldEnum];
export declare const RoomPlanScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly roomKey: "roomKey";
    readonly plannedDate: "plannedDate";
    readonly createdAt: "createdAt";
};
export type RoomPlanScalarFieldEnum = (typeof RoomPlanScalarFieldEnum)[keyof typeof RoomPlanScalarFieldEnum];
export declare const RoomStudyLogScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly roomKey: "roomKey";
    readonly startAt: "startAt";
    readonly endAt: "endAt";
    readonly durationSec: "durationSec";
};
export type RoomStudyLogScalarFieldEnum = (typeof RoomStudyLogScalarFieldEnum)[keyof typeof RoomStudyLogScalarFieldEnum];
export declare const QuestionnaireStatusScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly type: "type";
    readonly status: "status";
    readonly completedAt: "completedAt";
    readonly updatedAt: "updatedAt";
};
export type QuestionnaireStatusScalarFieldEnum = (typeof QuestionnaireStatusScalarFieldEnum)[keyof typeof QuestionnaireStatusScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
