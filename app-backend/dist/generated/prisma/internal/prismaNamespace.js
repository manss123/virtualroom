"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineExtension = exports.NullsOrder = exports.QueryMode = exports.SortOrder = exports.QuestionnaireStatusScalarFieldEnum = exports.RoomStudyLogScalarFieldEnum = exports.RoomPlanScalarFieldEnum = exports.SelfRegAssessmentScalarFieldEnum = exports.PrePostTestScalarFieldEnum = exports.AuthIdentityScalarFieldEnum = exports.UserScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.prismaVersion = exports.getExtensionContext = exports.Decimal = exports.Sql = exports.raw = exports.join = exports.empty = exports.sql = exports.PrismaClientValidationError = exports.PrismaClientInitializationError = exports.PrismaClientRustPanicError = exports.PrismaClientUnknownRequestError = exports.PrismaClientKnownRequestError = void 0;
const runtime = require("@prisma/client/runtime/library");
exports.PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
exports.PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
exports.PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
exports.PrismaClientInitializationError = runtime.PrismaClientInitializationError;
exports.PrismaClientValidationError = runtime.PrismaClientValidationError;
exports.sql = runtime.sqltag;
exports.empty = runtime.empty;
exports.join = runtime.join;
exports.raw = runtime.raw;
exports.Sql = runtime.Sql;
exports.Decimal = runtime.Decimal;
exports.getExtensionContext = runtime.Extensions.getExtensionContext;
exports.prismaVersion = {
    client: "6.19.0",
    engine: "2ba551f319ab1df4bc874a89965d8b3641056773"
};
exports.NullTypes = {
    DbNull: runtime.objectEnumValues.classes.DbNull,
    JsonNull: runtime.objectEnumValues.classes.JsonNull,
    AnyNull: runtime.objectEnumValues.classes.AnyNull,
};
exports.DbNull = runtime.objectEnumValues.instances.DbNull;
exports.JsonNull = runtime.objectEnumValues.instances.JsonNull;
exports.AnyNull = runtime.objectEnumValues.instances.AnyNull;
exports.ModelName = {
    User: 'User',
    AuthIdentity: 'AuthIdentity',
    PrePostTest: 'PrePostTest',
    SelfRegAssessment: 'SelfRegAssessment',
    RoomPlan: 'RoomPlan',
    RoomStudyLog: 'RoomStudyLog',
    QuestionnaireStatus: 'QuestionnaireStatus'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.UserScalarFieldEnum = {
    id: 'id',
    email: 'email',
    firstName: 'firstName',
    lastName: 'lastName',
    sex: 'sex',
    age: 'age',
    school: 'school',
    grade: 'grade',
    refreshTokenHash: 'refreshTokenHash',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    pdpaAccepted: 'pdpaAccepted',
    pdpaAcceptedAt: 'pdpaAcceptedAt'
};
exports.AuthIdentityScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    provider: 'provider',
    providerUserId: 'providerUserId',
    email: 'email',
    passwordHash: 'passwordHash'
};
exports.PrePostTestScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    type: 'type',
    totalItems: 'totalItems',
    score: 'score',
    takenAt: 'takenAt'
};
exports.SelfRegAssessmentScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    totalItems: 'totalItems',
    score: 'score',
    takenAt: 'takenAt'
};
exports.RoomPlanScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    roomKey: 'roomKey',
    plannedDate: 'plannedDate',
    createdAt: 'createdAt'
};
exports.RoomStudyLogScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    roomKey: 'roomKey',
    startAt: 'startAt',
    endAt: 'endAt',
    durationSec: 'durationSec'
};
exports.QuestionnaireStatusScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    type: 'type',
    status: 'status',
    completedAt: 'completedAt',
    updatedAt: 'updatedAt'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map