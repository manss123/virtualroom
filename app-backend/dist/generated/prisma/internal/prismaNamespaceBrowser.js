"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullsOrder = exports.QueryMode = exports.SortOrder = exports.RoomStudyLogScalarFieldEnum = exports.RoomPlanScalarFieldEnum = exports.SelfRegAssessmentScalarFieldEnum = exports.PrePostTestScalarFieldEnum = exports.AuthIdentityScalarFieldEnum = exports.UserScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.Decimal = void 0;
const runtime = require("@prisma/client/runtime/index-browser");
exports.Decimal = runtime.Decimal;
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
    RoomStudyLog: 'RoomStudyLog'
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
    updatedAt: 'updatedAt'
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
//# sourceMappingURL=prismaNamespaceBrowser.js.map