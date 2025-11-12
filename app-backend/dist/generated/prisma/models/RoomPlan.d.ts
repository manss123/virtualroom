import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace";
export type RoomPlanModel = runtime.Types.Result.DefaultSelection<Prisma.$RoomPlanPayload>;
export type AggregateRoomPlan = {
    _count: RoomPlanCountAggregateOutputType | null;
    _min: RoomPlanMinAggregateOutputType | null;
    _max: RoomPlanMaxAggregateOutputType | null;
};
export type RoomPlanMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    roomKey: string | null;
    plannedDate: Date | null;
    createdAt: Date | null;
};
export type RoomPlanMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    roomKey: string | null;
    plannedDate: Date | null;
    createdAt: Date | null;
};
export type RoomPlanCountAggregateOutputType = {
    id: number;
    userId: number;
    roomKey: number;
    plannedDate: number;
    createdAt: number;
    _all: number;
};
export type RoomPlanMinAggregateInputType = {
    id?: true;
    userId?: true;
    roomKey?: true;
    plannedDate?: true;
    createdAt?: true;
};
export type RoomPlanMaxAggregateInputType = {
    id?: true;
    userId?: true;
    roomKey?: true;
    plannedDate?: true;
    createdAt?: true;
};
export type RoomPlanCountAggregateInputType = {
    id?: true;
    userId?: true;
    roomKey?: true;
    plannedDate?: true;
    createdAt?: true;
    _all?: true;
};
export type RoomPlanAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RoomPlanWhereInput;
    orderBy?: Prisma.RoomPlanOrderByWithRelationInput | Prisma.RoomPlanOrderByWithRelationInput[];
    cursor?: Prisma.RoomPlanWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | RoomPlanCountAggregateInputType;
    _min?: RoomPlanMinAggregateInputType;
    _max?: RoomPlanMaxAggregateInputType;
};
export type GetRoomPlanAggregateType<T extends RoomPlanAggregateArgs> = {
    [P in keyof T & keyof AggregateRoomPlan]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRoomPlan[P]> : Prisma.GetScalarType<T[P], AggregateRoomPlan[P]>;
};
export type RoomPlanGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RoomPlanWhereInput;
    orderBy?: Prisma.RoomPlanOrderByWithAggregationInput | Prisma.RoomPlanOrderByWithAggregationInput[];
    by: Prisma.RoomPlanScalarFieldEnum[] | Prisma.RoomPlanScalarFieldEnum;
    having?: Prisma.RoomPlanScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RoomPlanCountAggregateInputType | true;
    _min?: RoomPlanMinAggregateInputType;
    _max?: RoomPlanMaxAggregateInputType;
};
export type RoomPlanGroupByOutputType = {
    id: string;
    userId: string;
    roomKey: string;
    plannedDate: Date;
    createdAt: Date;
    _count: RoomPlanCountAggregateOutputType | null;
    _min: RoomPlanMinAggregateOutputType | null;
    _max: RoomPlanMaxAggregateOutputType | null;
};
type GetRoomPlanGroupByPayload<T extends RoomPlanGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RoomPlanGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RoomPlanGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RoomPlanGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RoomPlanGroupByOutputType[P]>;
}>>;
export type RoomPlanWhereInput = {
    AND?: Prisma.RoomPlanWhereInput | Prisma.RoomPlanWhereInput[];
    OR?: Prisma.RoomPlanWhereInput[];
    NOT?: Prisma.RoomPlanWhereInput | Prisma.RoomPlanWhereInput[];
    id?: Prisma.StringFilter<"RoomPlan"> | string;
    userId?: Prisma.StringFilter<"RoomPlan"> | string;
    roomKey?: Prisma.StringFilter<"RoomPlan"> | string;
    plannedDate?: Prisma.DateTimeFilter<"RoomPlan"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"RoomPlan"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type RoomPlanOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    roomKey?: Prisma.SortOrder;
    plannedDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type RoomPlanWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.RoomPlanWhereInput | Prisma.RoomPlanWhereInput[];
    OR?: Prisma.RoomPlanWhereInput[];
    NOT?: Prisma.RoomPlanWhereInput | Prisma.RoomPlanWhereInput[];
    userId?: Prisma.StringFilter<"RoomPlan"> | string;
    roomKey?: Prisma.StringFilter<"RoomPlan"> | string;
    plannedDate?: Prisma.DateTimeFilter<"RoomPlan"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"RoomPlan"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type RoomPlanOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    roomKey?: Prisma.SortOrder;
    plannedDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.RoomPlanCountOrderByAggregateInput;
    _max?: Prisma.RoomPlanMaxOrderByAggregateInput;
    _min?: Prisma.RoomPlanMinOrderByAggregateInput;
};
export type RoomPlanScalarWhereWithAggregatesInput = {
    AND?: Prisma.RoomPlanScalarWhereWithAggregatesInput | Prisma.RoomPlanScalarWhereWithAggregatesInput[];
    OR?: Prisma.RoomPlanScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RoomPlanScalarWhereWithAggregatesInput | Prisma.RoomPlanScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"RoomPlan"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"RoomPlan"> | string;
    roomKey?: Prisma.StringWithAggregatesFilter<"RoomPlan"> | string;
    plannedDate?: Prisma.DateTimeWithAggregatesFilter<"RoomPlan"> | Date | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"RoomPlan"> | Date | string;
};
export type RoomPlanCreateInput = {
    id?: string;
    roomKey: string;
    plannedDate: Date | string;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutRoomPlansInput;
};
export type RoomPlanUncheckedCreateInput = {
    id?: string;
    userId: string;
    roomKey: string;
    plannedDate: Date | string;
    createdAt?: Date | string;
};
export type RoomPlanUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roomKey?: Prisma.StringFieldUpdateOperationsInput | string;
    plannedDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutRoomPlansNestedInput;
};
export type RoomPlanUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    roomKey?: Prisma.StringFieldUpdateOperationsInput | string;
    plannedDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RoomPlanCreateManyInput = {
    id?: string;
    userId: string;
    roomKey: string;
    plannedDate: Date | string;
    createdAt?: Date | string;
};
export type RoomPlanUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roomKey?: Prisma.StringFieldUpdateOperationsInput | string;
    plannedDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RoomPlanUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    roomKey?: Prisma.StringFieldUpdateOperationsInput | string;
    plannedDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RoomPlanListRelationFilter = {
    every?: Prisma.RoomPlanWhereInput;
    some?: Prisma.RoomPlanWhereInput;
    none?: Prisma.RoomPlanWhereInput;
};
export type RoomPlanOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type RoomPlanCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    roomKey?: Prisma.SortOrder;
    plannedDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RoomPlanMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    roomKey?: Prisma.SortOrder;
    plannedDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RoomPlanMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    roomKey?: Prisma.SortOrder;
    plannedDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RoomPlanCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.RoomPlanCreateWithoutUserInput, Prisma.RoomPlanUncheckedCreateWithoutUserInput> | Prisma.RoomPlanCreateWithoutUserInput[] | Prisma.RoomPlanUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RoomPlanCreateOrConnectWithoutUserInput | Prisma.RoomPlanCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.RoomPlanCreateManyUserInputEnvelope;
    connect?: Prisma.RoomPlanWhereUniqueInput | Prisma.RoomPlanWhereUniqueInput[];
};
export type RoomPlanUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.RoomPlanCreateWithoutUserInput, Prisma.RoomPlanUncheckedCreateWithoutUserInput> | Prisma.RoomPlanCreateWithoutUserInput[] | Prisma.RoomPlanUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RoomPlanCreateOrConnectWithoutUserInput | Prisma.RoomPlanCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.RoomPlanCreateManyUserInputEnvelope;
    connect?: Prisma.RoomPlanWhereUniqueInput | Prisma.RoomPlanWhereUniqueInput[];
};
export type RoomPlanUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.RoomPlanCreateWithoutUserInput, Prisma.RoomPlanUncheckedCreateWithoutUserInput> | Prisma.RoomPlanCreateWithoutUserInput[] | Prisma.RoomPlanUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RoomPlanCreateOrConnectWithoutUserInput | Prisma.RoomPlanCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.RoomPlanUpsertWithWhereUniqueWithoutUserInput | Prisma.RoomPlanUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.RoomPlanCreateManyUserInputEnvelope;
    set?: Prisma.RoomPlanWhereUniqueInput | Prisma.RoomPlanWhereUniqueInput[];
    disconnect?: Prisma.RoomPlanWhereUniqueInput | Prisma.RoomPlanWhereUniqueInput[];
    delete?: Prisma.RoomPlanWhereUniqueInput | Prisma.RoomPlanWhereUniqueInput[];
    connect?: Prisma.RoomPlanWhereUniqueInput | Prisma.RoomPlanWhereUniqueInput[];
    update?: Prisma.RoomPlanUpdateWithWhereUniqueWithoutUserInput | Prisma.RoomPlanUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.RoomPlanUpdateManyWithWhereWithoutUserInput | Prisma.RoomPlanUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.RoomPlanScalarWhereInput | Prisma.RoomPlanScalarWhereInput[];
};
export type RoomPlanUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.RoomPlanCreateWithoutUserInput, Prisma.RoomPlanUncheckedCreateWithoutUserInput> | Prisma.RoomPlanCreateWithoutUserInput[] | Prisma.RoomPlanUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RoomPlanCreateOrConnectWithoutUserInput | Prisma.RoomPlanCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.RoomPlanUpsertWithWhereUniqueWithoutUserInput | Prisma.RoomPlanUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.RoomPlanCreateManyUserInputEnvelope;
    set?: Prisma.RoomPlanWhereUniqueInput | Prisma.RoomPlanWhereUniqueInput[];
    disconnect?: Prisma.RoomPlanWhereUniqueInput | Prisma.RoomPlanWhereUniqueInput[];
    delete?: Prisma.RoomPlanWhereUniqueInput | Prisma.RoomPlanWhereUniqueInput[];
    connect?: Prisma.RoomPlanWhereUniqueInput | Prisma.RoomPlanWhereUniqueInput[];
    update?: Prisma.RoomPlanUpdateWithWhereUniqueWithoutUserInput | Prisma.RoomPlanUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.RoomPlanUpdateManyWithWhereWithoutUserInput | Prisma.RoomPlanUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.RoomPlanScalarWhereInput | Prisma.RoomPlanScalarWhereInput[];
};
export type RoomPlanCreateWithoutUserInput = {
    id?: string;
    roomKey: string;
    plannedDate: Date | string;
    createdAt?: Date | string;
};
export type RoomPlanUncheckedCreateWithoutUserInput = {
    id?: string;
    roomKey: string;
    plannedDate: Date | string;
    createdAt?: Date | string;
};
export type RoomPlanCreateOrConnectWithoutUserInput = {
    where: Prisma.RoomPlanWhereUniqueInput;
    create: Prisma.XOR<Prisma.RoomPlanCreateWithoutUserInput, Prisma.RoomPlanUncheckedCreateWithoutUserInput>;
};
export type RoomPlanCreateManyUserInputEnvelope = {
    data: Prisma.RoomPlanCreateManyUserInput | Prisma.RoomPlanCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type RoomPlanUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.RoomPlanWhereUniqueInput;
    update: Prisma.XOR<Prisma.RoomPlanUpdateWithoutUserInput, Prisma.RoomPlanUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.RoomPlanCreateWithoutUserInput, Prisma.RoomPlanUncheckedCreateWithoutUserInput>;
};
export type RoomPlanUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.RoomPlanWhereUniqueInput;
    data: Prisma.XOR<Prisma.RoomPlanUpdateWithoutUserInput, Prisma.RoomPlanUncheckedUpdateWithoutUserInput>;
};
export type RoomPlanUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.RoomPlanScalarWhereInput;
    data: Prisma.XOR<Prisma.RoomPlanUpdateManyMutationInput, Prisma.RoomPlanUncheckedUpdateManyWithoutUserInput>;
};
export type RoomPlanScalarWhereInput = {
    AND?: Prisma.RoomPlanScalarWhereInput | Prisma.RoomPlanScalarWhereInput[];
    OR?: Prisma.RoomPlanScalarWhereInput[];
    NOT?: Prisma.RoomPlanScalarWhereInput | Prisma.RoomPlanScalarWhereInput[];
    id?: Prisma.StringFilter<"RoomPlan"> | string;
    userId?: Prisma.StringFilter<"RoomPlan"> | string;
    roomKey?: Prisma.StringFilter<"RoomPlan"> | string;
    plannedDate?: Prisma.DateTimeFilter<"RoomPlan"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"RoomPlan"> | Date | string;
};
export type RoomPlanCreateManyUserInput = {
    id?: string;
    roomKey: string;
    plannedDate: Date | string;
    createdAt?: Date | string;
};
export type RoomPlanUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roomKey?: Prisma.StringFieldUpdateOperationsInput | string;
    plannedDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RoomPlanUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roomKey?: Prisma.StringFieldUpdateOperationsInput | string;
    plannedDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RoomPlanUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roomKey?: Prisma.StringFieldUpdateOperationsInput | string;
    plannedDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RoomPlanSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    roomKey?: boolean;
    plannedDate?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["roomPlan"]>;
export type RoomPlanSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    roomKey?: boolean;
    plannedDate?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["roomPlan"]>;
export type RoomPlanSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    roomKey?: boolean;
    plannedDate?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["roomPlan"]>;
export type RoomPlanSelectScalar = {
    id?: boolean;
    userId?: boolean;
    roomKey?: boolean;
    plannedDate?: boolean;
    createdAt?: boolean;
};
export type RoomPlanOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "roomKey" | "plannedDate" | "createdAt", ExtArgs["result"]["roomPlan"]>;
export type RoomPlanInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type RoomPlanIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type RoomPlanIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $RoomPlanPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "RoomPlan";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        roomKey: string;
        plannedDate: Date;
        createdAt: Date;
    }, ExtArgs["result"]["roomPlan"]>;
    composites: {};
};
export type RoomPlanGetPayload<S extends boolean | null | undefined | RoomPlanDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RoomPlanPayload, S>;
export type RoomPlanCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RoomPlanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RoomPlanCountAggregateInputType | true;
};
export interface RoomPlanDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['RoomPlan'];
        meta: {
            name: 'RoomPlan';
        };
    };
    findUnique<T extends RoomPlanFindUniqueArgs>(args: Prisma.SelectSubset<T, RoomPlanFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RoomPlanClient<runtime.Types.Result.GetResult<Prisma.$RoomPlanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends RoomPlanFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RoomPlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RoomPlanClient<runtime.Types.Result.GetResult<Prisma.$RoomPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends RoomPlanFindFirstArgs>(args?: Prisma.SelectSubset<T, RoomPlanFindFirstArgs<ExtArgs>>): Prisma.Prisma__RoomPlanClient<runtime.Types.Result.GetResult<Prisma.$RoomPlanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends RoomPlanFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RoomPlanFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RoomPlanClient<runtime.Types.Result.GetResult<Prisma.$RoomPlanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends RoomPlanFindManyArgs>(args?: Prisma.SelectSubset<T, RoomPlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoomPlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends RoomPlanCreateArgs>(args: Prisma.SelectSubset<T, RoomPlanCreateArgs<ExtArgs>>): Prisma.Prisma__RoomPlanClient<runtime.Types.Result.GetResult<Prisma.$RoomPlanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends RoomPlanCreateManyArgs>(args?: Prisma.SelectSubset<T, RoomPlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends RoomPlanCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RoomPlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoomPlanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends RoomPlanDeleteArgs>(args: Prisma.SelectSubset<T, RoomPlanDeleteArgs<ExtArgs>>): Prisma.Prisma__RoomPlanClient<runtime.Types.Result.GetResult<Prisma.$RoomPlanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends RoomPlanUpdateArgs>(args: Prisma.SelectSubset<T, RoomPlanUpdateArgs<ExtArgs>>): Prisma.Prisma__RoomPlanClient<runtime.Types.Result.GetResult<Prisma.$RoomPlanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends RoomPlanDeleteManyArgs>(args?: Prisma.SelectSubset<T, RoomPlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends RoomPlanUpdateManyArgs>(args: Prisma.SelectSubset<T, RoomPlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends RoomPlanUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RoomPlanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoomPlanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends RoomPlanUpsertArgs>(args: Prisma.SelectSubset<T, RoomPlanUpsertArgs<ExtArgs>>): Prisma.Prisma__RoomPlanClient<runtime.Types.Result.GetResult<Prisma.$RoomPlanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends RoomPlanCountArgs>(args?: Prisma.Subset<T, RoomPlanCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RoomPlanCountAggregateOutputType> : number>;
    aggregate<T extends RoomPlanAggregateArgs>(args: Prisma.Subset<T, RoomPlanAggregateArgs>): Prisma.PrismaPromise<GetRoomPlanAggregateType<T>>;
    groupBy<T extends RoomPlanGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RoomPlanGroupByArgs['orderBy'];
    } : {
        orderBy?: RoomPlanGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RoomPlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: RoomPlanFieldRefs;
}
export interface Prisma__RoomPlanClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface RoomPlanFieldRefs {
    readonly id: Prisma.FieldRef<"RoomPlan", 'String'>;
    readonly userId: Prisma.FieldRef<"RoomPlan", 'String'>;
    readonly roomKey: Prisma.FieldRef<"RoomPlan", 'String'>;
    readonly plannedDate: Prisma.FieldRef<"RoomPlan", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"RoomPlan", 'DateTime'>;
}
export type RoomPlanFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomPlanSelect<ExtArgs> | null;
    omit?: Prisma.RoomPlanOmit<ExtArgs> | null;
    include?: Prisma.RoomPlanInclude<ExtArgs> | null;
    where: Prisma.RoomPlanWhereUniqueInput;
};
export type RoomPlanFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomPlanSelect<ExtArgs> | null;
    omit?: Prisma.RoomPlanOmit<ExtArgs> | null;
    include?: Prisma.RoomPlanInclude<ExtArgs> | null;
    where: Prisma.RoomPlanWhereUniqueInput;
};
export type RoomPlanFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomPlanSelect<ExtArgs> | null;
    omit?: Prisma.RoomPlanOmit<ExtArgs> | null;
    include?: Prisma.RoomPlanInclude<ExtArgs> | null;
    where?: Prisma.RoomPlanWhereInput;
    orderBy?: Prisma.RoomPlanOrderByWithRelationInput | Prisma.RoomPlanOrderByWithRelationInput[];
    cursor?: Prisma.RoomPlanWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RoomPlanScalarFieldEnum | Prisma.RoomPlanScalarFieldEnum[];
};
export type RoomPlanFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomPlanSelect<ExtArgs> | null;
    omit?: Prisma.RoomPlanOmit<ExtArgs> | null;
    include?: Prisma.RoomPlanInclude<ExtArgs> | null;
    where?: Prisma.RoomPlanWhereInput;
    orderBy?: Prisma.RoomPlanOrderByWithRelationInput | Prisma.RoomPlanOrderByWithRelationInput[];
    cursor?: Prisma.RoomPlanWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RoomPlanScalarFieldEnum | Prisma.RoomPlanScalarFieldEnum[];
};
export type RoomPlanFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomPlanSelect<ExtArgs> | null;
    omit?: Prisma.RoomPlanOmit<ExtArgs> | null;
    include?: Prisma.RoomPlanInclude<ExtArgs> | null;
    where?: Prisma.RoomPlanWhereInput;
    orderBy?: Prisma.RoomPlanOrderByWithRelationInput | Prisma.RoomPlanOrderByWithRelationInput[];
    cursor?: Prisma.RoomPlanWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RoomPlanScalarFieldEnum | Prisma.RoomPlanScalarFieldEnum[];
};
export type RoomPlanCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomPlanSelect<ExtArgs> | null;
    omit?: Prisma.RoomPlanOmit<ExtArgs> | null;
    include?: Prisma.RoomPlanInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RoomPlanCreateInput, Prisma.RoomPlanUncheckedCreateInput>;
};
export type RoomPlanCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.RoomPlanCreateManyInput | Prisma.RoomPlanCreateManyInput[];
    skipDuplicates?: boolean;
};
export type RoomPlanCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomPlanSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RoomPlanOmit<ExtArgs> | null;
    data: Prisma.RoomPlanCreateManyInput | Prisma.RoomPlanCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.RoomPlanIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type RoomPlanUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomPlanSelect<ExtArgs> | null;
    omit?: Prisma.RoomPlanOmit<ExtArgs> | null;
    include?: Prisma.RoomPlanInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RoomPlanUpdateInput, Prisma.RoomPlanUncheckedUpdateInput>;
    where: Prisma.RoomPlanWhereUniqueInput;
};
export type RoomPlanUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.RoomPlanUpdateManyMutationInput, Prisma.RoomPlanUncheckedUpdateManyInput>;
    where?: Prisma.RoomPlanWhereInput;
    limit?: number;
};
export type RoomPlanUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomPlanSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RoomPlanOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RoomPlanUpdateManyMutationInput, Prisma.RoomPlanUncheckedUpdateManyInput>;
    where?: Prisma.RoomPlanWhereInput;
    limit?: number;
    include?: Prisma.RoomPlanIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type RoomPlanUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomPlanSelect<ExtArgs> | null;
    omit?: Prisma.RoomPlanOmit<ExtArgs> | null;
    include?: Prisma.RoomPlanInclude<ExtArgs> | null;
    where: Prisma.RoomPlanWhereUniqueInput;
    create: Prisma.XOR<Prisma.RoomPlanCreateInput, Prisma.RoomPlanUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.RoomPlanUpdateInput, Prisma.RoomPlanUncheckedUpdateInput>;
};
export type RoomPlanDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomPlanSelect<ExtArgs> | null;
    omit?: Prisma.RoomPlanOmit<ExtArgs> | null;
    include?: Prisma.RoomPlanInclude<ExtArgs> | null;
    where: Prisma.RoomPlanWhereUniqueInput;
};
export type RoomPlanDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RoomPlanWhereInput;
    limit?: number;
};
export type RoomPlanDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomPlanSelect<ExtArgs> | null;
    omit?: Prisma.RoomPlanOmit<ExtArgs> | null;
    include?: Prisma.RoomPlanInclude<ExtArgs> | null;
};
export {};
