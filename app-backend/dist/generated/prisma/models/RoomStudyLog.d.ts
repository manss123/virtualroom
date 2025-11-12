import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace";
export type RoomStudyLogModel = runtime.Types.Result.DefaultSelection<Prisma.$RoomStudyLogPayload>;
export type AggregateRoomStudyLog = {
    _count: RoomStudyLogCountAggregateOutputType | null;
    _avg: RoomStudyLogAvgAggregateOutputType | null;
    _sum: RoomStudyLogSumAggregateOutputType | null;
    _min: RoomStudyLogMinAggregateOutputType | null;
    _max: RoomStudyLogMaxAggregateOutputType | null;
};
export type RoomStudyLogAvgAggregateOutputType = {
    durationSec: number | null;
};
export type RoomStudyLogSumAggregateOutputType = {
    durationSec: number | null;
};
export type RoomStudyLogMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    roomKey: string | null;
    startAt: Date | null;
    endAt: Date | null;
    durationSec: number | null;
};
export type RoomStudyLogMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    roomKey: string | null;
    startAt: Date | null;
    endAt: Date | null;
    durationSec: number | null;
};
export type RoomStudyLogCountAggregateOutputType = {
    id: number;
    userId: number;
    roomKey: number;
    startAt: number;
    endAt: number;
    durationSec: number;
    _all: number;
};
export type RoomStudyLogAvgAggregateInputType = {
    durationSec?: true;
};
export type RoomStudyLogSumAggregateInputType = {
    durationSec?: true;
};
export type RoomStudyLogMinAggregateInputType = {
    id?: true;
    userId?: true;
    roomKey?: true;
    startAt?: true;
    endAt?: true;
    durationSec?: true;
};
export type RoomStudyLogMaxAggregateInputType = {
    id?: true;
    userId?: true;
    roomKey?: true;
    startAt?: true;
    endAt?: true;
    durationSec?: true;
};
export type RoomStudyLogCountAggregateInputType = {
    id?: true;
    userId?: true;
    roomKey?: true;
    startAt?: true;
    endAt?: true;
    durationSec?: true;
    _all?: true;
};
export type RoomStudyLogAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RoomStudyLogWhereInput;
    orderBy?: Prisma.RoomStudyLogOrderByWithRelationInput | Prisma.RoomStudyLogOrderByWithRelationInput[];
    cursor?: Prisma.RoomStudyLogWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | RoomStudyLogCountAggregateInputType;
    _avg?: RoomStudyLogAvgAggregateInputType;
    _sum?: RoomStudyLogSumAggregateInputType;
    _min?: RoomStudyLogMinAggregateInputType;
    _max?: RoomStudyLogMaxAggregateInputType;
};
export type GetRoomStudyLogAggregateType<T extends RoomStudyLogAggregateArgs> = {
    [P in keyof T & keyof AggregateRoomStudyLog]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRoomStudyLog[P]> : Prisma.GetScalarType<T[P], AggregateRoomStudyLog[P]>;
};
export type RoomStudyLogGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RoomStudyLogWhereInput;
    orderBy?: Prisma.RoomStudyLogOrderByWithAggregationInput | Prisma.RoomStudyLogOrderByWithAggregationInput[];
    by: Prisma.RoomStudyLogScalarFieldEnum[] | Prisma.RoomStudyLogScalarFieldEnum;
    having?: Prisma.RoomStudyLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RoomStudyLogCountAggregateInputType | true;
    _avg?: RoomStudyLogAvgAggregateInputType;
    _sum?: RoomStudyLogSumAggregateInputType;
    _min?: RoomStudyLogMinAggregateInputType;
    _max?: RoomStudyLogMaxAggregateInputType;
};
export type RoomStudyLogGroupByOutputType = {
    id: string;
    userId: string;
    roomKey: string;
    startAt: Date;
    endAt: Date;
    durationSec: number | null;
    _count: RoomStudyLogCountAggregateOutputType | null;
    _avg: RoomStudyLogAvgAggregateOutputType | null;
    _sum: RoomStudyLogSumAggregateOutputType | null;
    _min: RoomStudyLogMinAggregateOutputType | null;
    _max: RoomStudyLogMaxAggregateOutputType | null;
};
type GetRoomStudyLogGroupByPayload<T extends RoomStudyLogGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RoomStudyLogGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RoomStudyLogGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RoomStudyLogGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RoomStudyLogGroupByOutputType[P]>;
}>>;
export type RoomStudyLogWhereInput = {
    AND?: Prisma.RoomStudyLogWhereInput | Prisma.RoomStudyLogWhereInput[];
    OR?: Prisma.RoomStudyLogWhereInput[];
    NOT?: Prisma.RoomStudyLogWhereInput | Prisma.RoomStudyLogWhereInput[];
    id?: Prisma.StringFilter<"RoomStudyLog"> | string;
    userId?: Prisma.StringFilter<"RoomStudyLog"> | string;
    roomKey?: Prisma.StringFilter<"RoomStudyLog"> | string;
    startAt?: Prisma.DateTimeFilter<"RoomStudyLog"> | Date | string;
    endAt?: Prisma.DateTimeFilter<"RoomStudyLog"> | Date | string;
    durationSec?: Prisma.IntNullableFilter<"RoomStudyLog"> | number | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type RoomStudyLogOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    roomKey?: Prisma.SortOrder;
    startAt?: Prisma.SortOrder;
    endAt?: Prisma.SortOrder;
    durationSec?: Prisma.SortOrderInput | Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type RoomStudyLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.RoomStudyLogWhereInput | Prisma.RoomStudyLogWhereInput[];
    OR?: Prisma.RoomStudyLogWhereInput[];
    NOT?: Prisma.RoomStudyLogWhereInput | Prisma.RoomStudyLogWhereInput[];
    userId?: Prisma.StringFilter<"RoomStudyLog"> | string;
    roomKey?: Prisma.StringFilter<"RoomStudyLog"> | string;
    startAt?: Prisma.DateTimeFilter<"RoomStudyLog"> | Date | string;
    endAt?: Prisma.DateTimeFilter<"RoomStudyLog"> | Date | string;
    durationSec?: Prisma.IntNullableFilter<"RoomStudyLog"> | number | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type RoomStudyLogOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    roomKey?: Prisma.SortOrder;
    startAt?: Prisma.SortOrder;
    endAt?: Prisma.SortOrder;
    durationSec?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.RoomStudyLogCountOrderByAggregateInput;
    _avg?: Prisma.RoomStudyLogAvgOrderByAggregateInput;
    _max?: Prisma.RoomStudyLogMaxOrderByAggregateInput;
    _min?: Prisma.RoomStudyLogMinOrderByAggregateInput;
    _sum?: Prisma.RoomStudyLogSumOrderByAggregateInput;
};
export type RoomStudyLogScalarWhereWithAggregatesInput = {
    AND?: Prisma.RoomStudyLogScalarWhereWithAggregatesInput | Prisma.RoomStudyLogScalarWhereWithAggregatesInput[];
    OR?: Prisma.RoomStudyLogScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RoomStudyLogScalarWhereWithAggregatesInput | Prisma.RoomStudyLogScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"RoomStudyLog"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"RoomStudyLog"> | string;
    roomKey?: Prisma.StringWithAggregatesFilter<"RoomStudyLog"> | string;
    startAt?: Prisma.DateTimeWithAggregatesFilter<"RoomStudyLog"> | Date | string;
    endAt?: Prisma.DateTimeWithAggregatesFilter<"RoomStudyLog"> | Date | string;
    durationSec?: Prisma.IntNullableWithAggregatesFilter<"RoomStudyLog"> | number | null;
};
export type RoomStudyLogCreateInput = {
    id?: string;
    roomKey: string;
    startAt: Date | string;
    endAt: Date | string;
    durationSec?: number | null;
    user: Prisma.UserCreateNestedOneWithoutStudyLogsInput;
};
export type RoomStudyLogUncheckedCreateInput = {
    id?: string;
    userId: string;
    roomKey: string;
    startAt: Date | string;
    endAt: Date | string;
    durationSec?: number | null;
};
export type RoomStudyLogUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roomKey?: Prisma.StringFieldUpdateOperationsInput | string;
    startAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationSec?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    user?: Prisma.UserUpdateOneRequiredWithoutStudyLogsNestedInput;
};
export type RoomStudyLogUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    roomKey?: Prisma.StringFieldUpdateOperationsInput | string;
    startAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationSec?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type RoomStudyLogCreateManyInput = {
    id?: string;
    userId: string;
    roomKey: string;
    startAt: Date | string;
    endAt: Date | string;
    durationSec?: number | null;
};
export type RoomStudyLogUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roomKey?: Prisma.StringFieldUpdateOperationsInput | string;
    startAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationSec?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type RoomStudyLogUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    roomKey?: Prisma.StringFieldUpdateOperationsInput | string;
    startAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationSec?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type RoomStudyLogListRelationFilter = {
    every?: Prisma.RoomStudyLogWhereInput;
    some?: Prisma.RoomStudyLogWhereInput;
    none?: Prisma.RoomStudyLogWhereInput;
};
export type RoomStudyLogOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type RoomStudyLogCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    roomKey?: Prisma.SortOrder;
    startAt?: Prisma.SortOrder;
    endAt?: Prisma.SortOrder;
    durationSec?: Prisma.SortOrder;
};
export type RoomStudyLogAvgOrderByAggregateInput = {
    durationSec?: Prisma.SortOrder;
};
export type RoomStudyLogMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    roomKey?: Prisma.SortOrder;
    startAt?: Prisma.SortOrder;
    endAt?: Prisma.SortOrder;
    durationSec?: Prisma.SortOrder;
};
export type RoomStudyLogMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    roomKey?: Prisma.SortOrder;
    startAt?: Prisma.SortOrder;
    endAt?: Prisma.SortOrder;
    durationSec?: Prisma.SortOrder;
};
export type RoomStudyLogSumOrderByAggregateInput = {
    durationSec?: Prisma.SortOrder;
};
export type RoomStudyLogCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.RoomStudyLogCreateWithoutUserInput, Prisma.RoomStudyLogUncheckedCreateWithoutUserInput> | Prisma.RoomStudyLogCreateWithoutUserInput[] | Prisma.RoomStudyLogUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RoomStudyLogCreateOrConnectWithoutUserInput | Prisma.RoomStudyLogCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.RoomStudyLogCreateManyUserInputEnvelope;
    connect?: Prisma.RoomStudyLogWhereUniqueInput | Prisma.RoomStudyLogWhereUniqueInput[];
};
export type RoomStudyLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.RoomStudyLogCreateWithoutUserInput, Prisma.RoomStudyLogUncheckedCreateWithoutUserInput> | Prisma.RoomStudyLogCreateWithoutUserInput[] | Prisma.RoomStudyLogUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RoomStudyLogCreateOrConnectWithoutUserInput | Prisma.RoomStudyLogCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.RoomStudyLogCreateManyUserInputEnvelope;
    connect?: Prisma.RoomStudyLogWhereUniqueInput | Prisma.RoomStudyLogWhereUniqueInput[];
};
export type RoomStudyLogUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.RoomStudyLogCreateWithoutUserInput, Prisma.RoomStudyLogUncheckedCreateWithoutUserInput> | Prisma.RoomStudyLogCreateWithoutUserInput[] | Prisma.RoomStudyLogUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RoomStudyLogCreateOrConnectWithoutUserInput | Prisma.RoomStudyLogCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.RoomStudyLogUpsertWithWhereUniqueWithoutUserInput | Prisma.RoomStudyLogUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.RoomStudyLogCreateManyUserInputEnvelope;
    set?: Prisma.RoomStudyLogWhereUniqueInput | Prisma.RoomStudyLogWhereUniqueInput[];
    disconnect?: Prisma.RoomStudyLogWhereUniqueInput | Prisma.RoomStudyLogWhereUniqueInput[];
    delete?: Prisma.RoomStudyLogWhereUniqueInput | Prisma.RoomStudyLogWhereUniqueInput[];
    connect?: Prisma.RoomStudyLogWhereUniqueInput | Prisma.RoomStudyLogWhereUniqueInput[];
    update?: Prisma.RoomStudyLogUpdateWithWhereUniqueWithoutUserInput | Prisma.RoomStudyLogUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.RoomStudyLogUpdateManyWithWhereWithoutUserInput | Prisma.RoomStudyLogUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.RoomStudyLogScalarWhereInput | Prisma.RoomStudyLogScalarWhereInput[];
};
export type RoomStudyLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.RoomStudyLogCreateWithoutUserInput, Prisma.RoomStudyLogUncheckedCreateWithoutUserInput> | Prisma.RoomStudyLogCreateWithoutUserInput[] | Prisma.RoomStudyLogUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RoomStudyLogCreateOrConnectWithoutUserInput | Prisma.RoomStudyLogCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.RoomStudyLogUpsertWithWhereUniqueWithoutUserInput | Prisma.RoomStudyLogUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.RoomStudyLogCreateManyUserInputEnvelope;
    set?: Prisma.RoomStudyLogWhereUniqueInput | Prisma.RoomStudyLogWhereUniqueInput[];
    disconnect?: Prisma.RoomStudyLogWhereUniqueInput | Prisma.RoomStudyLogWhereUniqueInput[];
    delete?: Prisma.RoomStudyLogWhereUniqueInput | Prisma.RoomStudyLogWhereUniqueInput[];
    connect?: Prisma.RoomStudyLogWhereUniqueInput | Prisma.RoomStudyLogWhereUniqueInput[];
    update?: Prisma.RoomStudyLogUpdateWithWhereUniqueWithoutUserInput | Prisma.RoomStudyLogUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.RoomStudyLogUpdateManyWithWhereWithoutUserInput | Prisma.RoomStudyLogUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.RoomStudyLogScalarWhereInput | Prisma.RoomStudyLogScalarWhereInput[];
};
export type RoomStudyLogCreateWithoutUserInput = {
    id?: string;
    roomKey: string;
    startAt: Date | string;
    endAt: Date | string;
    durationSec?: number | null;
};
export type RoomStudyLogUncheckedCreateWithoutUserInput = {
    id?: string;
    roomKey: string;
    startAt: Date | string;
    endAt: Date | string;
    durationSec?: number | null;
};
export type RoomStudyLogCreateOrConnectWithoutUserInput = {
    where: Prisma.RoomStudyLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.RoomStudyLogCreateWithoutUserInput, Prisma.RoomStudyLogUncheckedCreateWithoutUserInput>;
};
export type RoomStudyLogCreateManyUserInputEnvelope = {
    data: Prisma.RoomStudyLogCreateManyUserInput | Prisma.RoomStudyLogCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type RoomStudyLogUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.RoomStudyLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.RoomStudyLogUpdateWithoutUserInput, Prisma.RoomStudyLogUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.RoomStudyLogCreateWithoutUserInput, Prisma.RoomStudyLogUncheckedCreateWithoutUserInput>;
};
export type RoomStudyLogUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.RoomStudyLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.RoomStudyLogUpdateWithoutUserInput, Prisma.RoomStudyLogUncheckedUpdateWithoutUserInput>;
};
export type RoomStudyLogUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.RoomStudyLogScalarWhereInput;
    data: Prisma.XOR<Prisma.RoomStudyLogUpdateManyMutationInput, Prisma.RoomStudyLogUncheckedUpdateManyWithoutUserInput>;
};
export type RoomStudyLogScalarWhereInput = {
    AND?: Prisma.RoomStudyLogScalarWhereInput | Prisma.RoomStudyLogScalarWhereInput[];
    OR?: Prisma.RoomStudyLogScalarWhereInput[];
    NOT?: Prisma.RoomStudyLogScalarWhereInput | Prisma.RoomStudyLogScalarWhereInput[];
    id?: Prisma.StringFilter<"RoomStudyLog"> | string;
    userId?: Prisma.StringFilter<"RoomStudyLog"> | string;
    roomKey?: Prisma.StringFilter<"RoomStudyLog"> | string;
    startAt?: Prisma.DateTimeFilter<"RoomStudyLog"> | Date | string;
    endAt?: Prisma.DateTimeFilter<"RoomStudyLog"> | Date | string;
    durationSec?: Prisma.IntNullableFilter<"RoomStudyLog"> | number | null;
};
export type RoomStudyLogCreateManyUserInput = {
    id?: string;
    roomKey: string;
    startAt: Date | string;
    endAt: Date | string;
    durationSec?: number | null;
};
export type RoomStudyLogUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roomKey?: Prisma.StringFieldUpdateOperationsInput | string;
    startAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationSec?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type RoomStudyLogUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roomKey?: Prisma.StringFieldUpdateOperationsInput | string;
    startAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationSec?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type RoomStudyLogUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roomKey?: Prisma.StringFieldUpdateOperationsInput | string;
    startAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationSec?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type RoomStudyLogSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    roomKey?: boolean;
    startAt?: boolean;
    endAt?: boolean;
    durationSec?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["roomStudyLog"]>;
export type RoomStudyLogSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    roomKey?: boolean;
    startAt?: boolean;
    endAt?: boolean;
    durationSec?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["roomStudyLog"]>;
export type RoomStudyLogSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    roomKey?: boolean;
    startAt?: boolean;
    endAt?: boolean;
    durationSec?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["roomStudyLog"]>;
export type RoomStudyLogSelectScalar = {
    id?: boolean;
    userId?: boolean;
    roomKey?: boolean;
    startAt?: boolean;
    endAt?: boolean;
    durationSec?: boolean;
};
export type RoomStudyLogOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "roomKey" | "startAt" | "endAt" | "durationSec", ExtArgs["result"]["roomStudyLog"]>;
export type RoomStudyLogInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type RoomStudyLogIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type RoomStudyLogIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $RoomStudyLogPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "RoomStudyLog";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        roomKey: string;
        startAt: Date;
        endAt: Date;
        durationSec: number | null;
    }, ExtArgs["result"]["roomStudyLog"]>;
    composites: {};
};
export type RoomStudyLogGetPayload<S extends boolean | null | undefined | RoomStudyLogDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RoomStudyLogPayload, S>;
export type RoomStudyLogCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RoomStudyLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RoomStudyLogCountAggregateInputType | true;
};
export interface RoomStudyLogDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['RoomStudyLog'];
        meta: {
            name: 'RoomStudyLog';
        };
    };
    findUnique<T extends RoomStudyLogFindUniqueArgs>(args: Prisma.SelectSubset<T, RoomStudyLogFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RoomStudyLogClient<runtime.Types.Result.GetResult<Prisma.$RoomStudyLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends RoomStudyLogFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RoomStudyLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RoomStudyLogClient<runtime.Types.Result.GetResult<Prisma.$RoomStudyLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends RoomStudyLogFindFirstArgs>(args?: Prisma.SelectSubset<T, RoomStudyLogFindFirstArgs<ExtArgs>>): Prisma.Prisma__RoomStudyLogClient<runtime.Types.Result.GetResult<Prisma.$RoomStudyLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends RoomStudyLogFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RoomStudyLogFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RoomStudyLogClient<runtime.Types.Result.GetResult<Prisma.$RoomStudyLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends RoomStudyLogFindManyArgs>(args?: Prisma.SelectSubset<T, RoomStudyLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoomStudyLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends RoomStudyLogCreateArgs>(args: Prisma.SelectSubset<T, RoomStudyLogCreateArgs<ExtArgs>>): Prisma.Prisma__RoomStudyLogClient<runtime.Types.Result.GetResult<Prisma.$RoomStudyLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends RoomStudyLogCreateManyArgs>(args?: Prisma.SelectSubset<T, RoomStudyLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends RoomStudyLogCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RoomStudyLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoomStudyLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends RoomStudyLogDeleteArgs>(args: Prisma.SelectSubset<T, RoomStudyLogDeleteArgs<ExtArgs>>): Prisma.Prisma__RoomStudyLogClient<runtime.Types.Result.GetResult<Prisma.$RoomStudyLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends RoomStudyLogUpdateArgs>(args: Prisma.SelectSubset<T, RoomStudyLogUpdateArgs<ExtArgs>>): Prisma.Prisma__RoomStudyLogClient<runtime.Types.Result.GetResult<Prisma.$RoomStudyLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends RoomStudyLogDeleteManyArgs>(args?: Prisma.SelectSubset<T, RoomStudyLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends RoomStudyLogUpdateManyArgs>(args: Prisma.SelectSubset<T, RoomStudyLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends RoomStudyLogUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RoomStudyLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoomStudyLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends RoomStudyLogUpsertArgs>(args: Prisma.SelectSubset<T, RoomStudyLogUpsertArgs<ExtArgs>>): Prisma.Prisma__RoomStudyLogClient<runtime.Types.Result.GetResult<Prisma.$RoomStudyLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends RoomStudyLogCountArgs>(args?: Prisma.Subset<T, RoomStudyLogCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RoomStudyLogCountAggregateOutputType> : number>;
    aggregate<T extends RoomStudyLogAggregateArgs>(args: Prisma.Subset<T, RoomStudyLogAggregateArgs>): Prisma.PrismaPromise<GetRoomStudyLogAggregateType<T>>;
    groupBy<T extends RoomStudyLogGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RoomStudyLogGroupByArgs['orderBy'];
    } : {
        orderBy?: RoomStudyLogGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RoomStudyLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomStudyLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: RoomStudyLogFieldRefs;
}
export interface Prisma__RoomStudyLogClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface RoomStudyLogFieldRefs {
    readonly id: Prisma.FieldRef<"RoomStudyLog", 'String'>;
    readonly userId: Prisma.FieldRef<"RoomStudyLog", 'String'>;
    readonly roomKey: Prisma.FieldRef<"RoomStudyLog", 'String'>;
    readonly startAt: Prisma.FieldRef<"RoomStudyLog", 'DateTime'>;
    readonly endAt: Prisma.FieldRef<"RoomStudyLog", 'DateTime'>;
    readonly durationSec: Prisma.FieldRef<"RoomStudyLog", 'Int'>;
}
export type RoomStudyLogFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomStudyLogSelect<ExtArgs> | null;
    omit?: Prisma.RoomStudyLogOmit<ExtArgs> | null;
    include?: Prisma.RoomStudyLogInclude<ExtArgs> | null;
    where: Prisma.RoomStudyLogWhereUniqueInput;
};
export type RoomStudyLogFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomStudyLogSelect<ExtArgs> | null;
    omit?: Prisma.RoomStudyLogOmit<ExtArgs> | null;
    include?: Prisma.RoomStudyLogInclude<ExtArgs> | null;
    where: Prisma.RoomStudyLogWhereUniqueInput;
};
export type RoomStudyLogFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomStudyLogSelect<ExtArgs> | null;
    omit?: Prisma.RoomStudyLogOmit<ExtArgs> | null;
    include?: Prisma.RoomStudyLogInclude<ExtArgs> | null;
    where?: Prisma.RoomStudyLogWhereInput;
    orderBy?: Prisma.RoomStudyLogOrderByWithRelationInput | Prisma.RoomStudyLogOrderByWithRelationInput[];
    cursor?: Prisma.RoomStudyLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RoomStudyLogScalarFieldEnum | Prisma.RoomStudyLogScalarFieldEnum[];
};
export type RoomStudyLogFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomStudyLogSelect<ExtArgs> | null;
    omit?: Prisma.RoomStudyLogOmit<ExtArgs> | null;
    include?: Prisma.RoomStudyLogInclude<ExtArgs> | null;
    where?: Prisma.RoomStudyLogWhereInput;
    orderBy?: Prisma.RoomStudyLogOrderByWithRelationInput | Prisma.RoomStudyLogOrderByWithRelationInput[];
    cursor?: Prisma.RoomStudyLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RoomStudyLogScalarFieldEnum | Prisma.RoomStudyLogScalarFieldEnum[];
};
export type RoomStudyLogFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomStudyLogSelect<ExtArgs> | null;
    omit?: Prisma.RoomStudyLogOmit<ExtArgs> | null;
    include?: Prisma.RoomStudyLogInclude<ExtArgs> | null;
    where?: Prisma.RoomStudyLogWhereInput;
    orderBy?: Prisma.RoomStudyLogOrderByWithRelationInput | Prisma.RoomStudyLogOrderByWithRelationInput[];
    cursor?: Prisma.RoomStudyLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RoomStudyLogScalarFieldEnum | Prisma.RoomStudyLogScalarFieldEnum[];
};
export type RoomStudyLogCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomStudyLogSelect<ExtArgs> | null;
    omit?: Prisma.RoomStudyLogOmit<ExtArgs> | null;
    include?: Prisma.RoomStudyLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RoomStudyLogCreateInput, Prisma.RoomStudyLogUncheckedCreateInput>;
};
export type RoomStudyLogCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.RoomStudyLogCreateManyInput | Prisma.RoomStudyLogCreateManyInput[];
    skipDuplicates?: boolean;
};
export type RoomStudyLogCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomStudyLogSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RoomStudyLogOmit<ExtArgs> | null;
    data: Prisma.RoomStudyLogCreateManyInput | Prisma.RoomStudyLogCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.RoomStudyLogIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type RoomStudyLogUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomStudyLogSelect<ExtArgs> | null;
    omit?: Prisma.RoomStudyLogOmit<ExtArgs> | null;
    include?: Prisma.RoomStudyLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RoomStudyLogUpdateInput, Prisma.RoomStudyLogUncheckedUpdateInput>;
    where: Prisma.RoomStudyLogWhereUniqueInput;
};
export type RoomStudyLogUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.RoomStudyLogUpdateManyMutationInput, Prisma.RoomStudyLogUncheckedUpdateManyInput>;
    where?: Prisma.RoomStudyLogWhereInput;
    limit?: number;
};
export type RoomStudyLogUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomStudyLogSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RoomStudyLogOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RoomStudyLogUpdateManyMutationInput, Prisma.RoomStudyLogUncheckedUpdateManyInput>;
    where?: Prisma.RoomStudyLogWhereInput;
    limit?: number;
    include?: Prisma.RoomStudyLogIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type RoomStudyLogUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomStudyLogSelect<ExtArgs> | null;
    omit?: Prisma.RoomStudyLogOmit<ExtArgs> | null;
    include?: Prisma.RoomStudyLogInclude<ExtArgs> | null;
    where: Prisma.RoomStudyLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.RoomStudyLogCreateInput, Prisma.RoomStudyLogUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.RoomStudyLogUpdateInput, Prisma.RoomStudyLogUncheckedUpdateInput>;
};
export type RoomStudyLogDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomStudyLogSelect<ExtArgs> | null;
    omit?: Prisma.RoomStudyLogOmit<ExtArgs> | null;
    include?: Prisma.RoomStudyLogInclude<ExtArgs> | null;
    where: Prisma.RoomStudyLogWhereUniqueInput;
};
export type RoomStudyLogDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RoomStudyLogWhereInput;
    limit?: number;
};
export type RoomStudyLogDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomStudyLogSelect<ExtArgs> | null;
    omit?: Prisma.RoomStudyLogOmit<ExtArgs> | null;
    include?: Prisma.RoomStudyLogInclude<ExtArgs> | null;
};
export {};
