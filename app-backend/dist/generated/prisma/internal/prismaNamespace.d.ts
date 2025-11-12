import * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../models";
import { type PrismaClient } from "./class";
export type * from '../models';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
export type Metrics = runtime.Metrics;
export type Metric<T> = runtime.Metric<T>;
export type MetricHistogram = runtime.MetricHistogram;
export type MetricHistogramBucket = runtime.MetricHistogramBucket;
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
export declare const prismaVersion: PrismaVersion;
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
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
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
export type XOR<T, U> = T extends object ? U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U : T;
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
export declare const ModelName: {
    readonly User: "User";
    readonly AuthIdentity: "AuthIdentity";
    readonly PrePostTest: "PrePostTest";
    readonly SelfRegAssessment: "SelfRegAssessment";
    readonly RoomPlan: "RoomPlan";
    readonly RoomStudyLog: "RoomStudyLog";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "user" | "authIdentity" | "prePostTest" | "selfRegAssessment" | "roomPlan" | "roomStudyLog";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        User: {
            payload: Prisma.$UserPayload<ExtArgs>;
            fields: Prisma.UserFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findFirst: {
                    args: Prisma.UserFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findMany: {
                    args: Prisma.UserFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                create: {
                    args: Prisma.UserCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                createMany: {
                    args: Prisma.UserCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                delete: {
                    args: Prisma.UserDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                update: {
                    args: Prisma.UserUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                deleteMany: {
                    args: Prisma.UserDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                upsert: {
                    args: Prisma.UserUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                aggregate: {
                    args: Prisma.UserAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUser>;
                };
                groupBy: {
                    args: Prisma.UserGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserCountAggregateOutputType> | number;
                };
            };
        };
        AuthIdentity: {
            payload: Prisma.$AuthIdentityPayload<ExtArgs>;
            fields: Prisma.AuthIdentityFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AuthIdentityFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuthIdentityPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AuthIdentityFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuthIdentityPayload>;
                };
                findFirst: {
                    args: Prisma.AuthIdentityFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuthIdentityPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AuthIdentityFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuthIdentityPayload>;
                };
                findMany: {
                    args: Prisma.AuthIdentityFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuthIdentityPayload>[];
                };
                create: {
                    args: Prisma.AuthIdentityCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuthIdentityPayload>;
                };
                createMany: {
                    args: Prisma.AuthIdentityCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AuthIdentityCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuthIdentityPayload>[];
                };
                delete: {
                    args: Prisma.AuthIdentityDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuthIdentityPayload>;
                };
                update: {
                    args: Prisma.AuthIdentityUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuthIdentityPayload>;
                };
                deleteMany: {
                    args: Prisma.AuthIdentityDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AuthIdentityUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AuthIdentityUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuthIdentityPayload>[];
                };
                upsert: {
                    args: Prisma.AuthIdentityUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuthIdentityPayload>;
                };
                aggregate: {
                    args: Prisma.AuthIdentityAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAuthIdentity>;
                };
                groupBy: {
                    args: Prisma.AuthIdentityGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AuthIdentityGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AuthIdentityCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AuthIdentityCountAggregateOutputType> | number;
                };
            };
        };
        PrePostTest: {
            payload: Prisma.$PrePostTestPayload<ExtArgs>;
            fields: Prisma.PrePostTestFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PrePostTestFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrePostTestPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PrePostTestFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrePostTestPayload>;
                };
                findFirst: {
                    args: Prisma.PrePostTestFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrePostTestPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PrePostTestFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrePostTestPayload>;
                };
                findMany: {
                    args: Prisma.PrePostTestFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrePostTestPayload>[];
                };
                create: {
                    args: Prisma.PrePostTestCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrePostTestPayload>;
                };
                createMany: {
                    args: Prisma.PrePostTestCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PrePostTestCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrePostTestPayload>[];
                };
                delete: {
                    args: Prisma.PrePostTestDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrePostTestPayload>;
                };
                update: {
                    args: Prisma.PrePostTestUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrePostTestPayload>;
                };
                deleteMany: {
                    args: Prisma.PrePostTestDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PrePostTestUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PrePostTestUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrePostTestPayload>[];
                };
                upsert: {
                    args: Prisma.PrePostTestUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrePostTestPayload>;
                };
                aggregate: {
                    args: Prisma.PrePostTestAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePrePostTest>;
                };
                groupBy: {
                    args: Prisma.PrePostTestGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PrePostTestGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PrePostTestCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PrePostTestCountAggregateOutputType> | number;
                };
            };
        };
        SelfRegAssessment: {
            payload: Prisma.$SelfRegAssessmentPayload<ExtArgs>;
            fields: Prisma.SelfRegAssessmentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SelfRegAssessmentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SelfRegAssessmentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SelfRegAssessmentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SelfRegAssessmentPayload>;
                };
                findFirst: {
                    args: Prisma.SelfRegAssessmentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SelfRegAssessmentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SelfRegAssessmentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SelfRegAssessmentPayload>;
                };
                findMany: {
                    args: Prisma.SelfRegAssessmentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SelfRegAssessmentPayload>[];
                };
                create: {
                    args: Prisma.SelfRegAssessmentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SelfRegAssessmentPayload>;
                };
                createMany: {
                    args: Prisma.SelfRegAssessmentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SelfRegAssessmentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SelfRegAssessmentPayload>[];
                };
                delete: {
                    args: Prisma.SelfRegAssessmentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SelfRegAssessmentPayload>;
                };
                update: {
                    args: Prisma.SelfRegAssessmentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SelfRegAssessmentPayload>;
                };
                deleteMany: {
                    args: Prisma.SelfRegAssessmentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SelfRegAssessmentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SelfRegAssessmentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SelfRegAssessmentPayload>[];
                };
                upsert: {
                    args: Prisma.SelfRegAssessmentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SelfRegAssessmentPayload>;
                };
                aggregate: {
                    args: Prisma.SelfRegAssessmentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSelfRegAssessment>;
                };
                groupBy: {
                    args: Prisma.SelfRegAssessmentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SelfRegAssessmentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SelfRegAssessmentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SelfRegAssessmentCountAggregateOutputType> | number;
                };
            };
        };
        RoomPlan: {
            payload: Prisma.$RoomPlanPayload<ExtArgs>;
            fields: Prisma.RoomPlanFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RoomPlanFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomPlanPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RoomPlanFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomPlanPayload>;
                };
                findFirst: {
                    args: Prisma.RoomPlanFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomPlanPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RoomPlanFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomPlanPayload>;
                };
                findMany: {
                    args: Prisma.RoomPlanFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomPlanPayload>[];
                };
                create: {
                    args: Prisma.RoomPlanCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomPlanPayload>;
                };
                createMany: {
                    args: Prisma.RoomPlanCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RoomPlanCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomPlanPayload>[];
                };
                delete: {
                    args: Prisma.RoomPlanDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomPlanPayload>;
                };
                update: {
                    args: Prisma.RoomPlanUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomPlanPayload>;
                };
                deleteMany: {
                    args: Prisma.RoomPlanDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RoomPlanUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RoomPlanUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomPlanPayload>[];
                };
                upsert: {
                    args: Prisma.RoomPlanUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomPlanPayload>;
                };
                aggregate: {
                    args: Prisma.RoomPlanAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRoomPlan>;
                };
                groupBy: {
                    args: Prisma.RoomPlanGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RoomPlanGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RoomPlanCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RoomPlanCountAggregateOutputType> | number;
                };
            };
        };
        RoomStudyLog: {
            payload: Prisma.$RoomStudyLogPayload<ExtArgs>;
            fields: Prisma.RoomStudyLogFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RoomStudyLogFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomStudyLogPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RoomStudyLogFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomStudyLogPayload>;
                };
                findFirst: {
                    args: Prisma.RoomStudyLogFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomStudyLogPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RoomStudyLogFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomStudyLogPayload>;
                };
                findMany: {
                    args: Prisma.RoomStudyLogFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomStudyLogPayload>[];
                };
                create: {
                    args: Prisma.RoomStudyLogCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomStudyLogPayload>;
                };
                createMany: {
                    args: Prisma.RoomStudyLogCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RoomStudyLogCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomStudyLogPayload>[];
                };
                delete: {
                    args: Prisma.RoomStudyLogDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomStudyLogPayload>;
                };
                update: {
                    args: Prisma.RoomStudyLogUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomStudyLogPayload>;
                };
                deleteMany: {
                    args: Prisma.RoomStudyLogDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RoomStudyLogUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RoomStudyLogUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomStudyLogPayload>[];
                };
                upsert: {
                    args: Prisma.RoomStudyLogUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomStudyLogPayload>;
                };
                aggregate: {
                    args: Prisma.RoomStudyLogAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRoomStudyLog>;
                };
                groupBy: {
                    args: Prisma.RoomStudyLogGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RoomStudyLogGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RoomStudyLogCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RoomStudyLogCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
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
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
export type EnumPrePostTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PrePostType'>;
export type ListEnumPrePostTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PrePostType[]'>;
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
export type BatchPayload = {
    count: number;
};
export type Datasource = {
    url?: string;
};
export type Datasources = {
    db?: Datasource;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export interface PrismaClientOptions {
    datasources?: Datasources;
    datasourceUrl?: string;
    errorFormat?: ErrorFormat;
    log?: (LogLevel | LogDefinition)[];
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    adapter?: runtime.SqlDriverAdapterFactory | null;
    omit?: GlobalOmitConfig;
}
export type GlobalOmitConfig = {
    user?: Prisma.UserOmit;
    authIdentity?: Prisma.AuthIdentityOmit;
    prePostTest?: Prisma.PrePostTestOmit;
    selfRegAssessment?: Prisma.SelfRegAssessmentOmit;
    roomPlan?: Prisma.RoomPlanOmit;
    roomStudyLog?: Prisma.RoomStudyLogOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
