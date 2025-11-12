import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace";
export type SelfRegAssessmentModel = runtime.Types.Result.DefaultSelection<Prisma.$SelfRegAssessmentPayload>;
export type AggregateSelfRegAssessment = {
    _count: SelfRegAssessmentCountAggregateOutputType | null;
    _avg: SelfRegAssessmentAvgAggregateOutputType | null;
    _sum: SelfRegAssessmentSumAggregateOutputType | null;
    _min: SelfRegAssessmentMinAggregateOutputType | null;
    _max: SelfRegAssessmentMaxAggregateOutputType | null;
};
export type SelfRegAssessmentAvgAggregateOutputType = {
    totalItems: number | null;
    score: number | null;
};
export type SelfRegAssessmentSumAggregateOutputType = {
    totalItems: number | null;
    score: number | null;
};
export type SelfRegAssessmentMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    totalItems: number | null;
    score: number | null;
    takenAt: Date | null;
};
export type SelfRegAssessmentMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    totalItems: number | null;
    score: number | null;
    takenAt: Date | null;
};
export type SelfRegAssessmentCountAggregateOutputType = {
    id: number;
    userId: number;
    totalItems: number;
    score: number;
    takenAt: number;
    _all: number;
};
export type SelfRegAssessmentAvgAggregateInputType = {
    totalItems?: true;
    score?: true;
};
export type SelfRegAssessmentSumAggregateInputType = {
    totalItems?: true;
    score?: true;
};
export type SelfRegAssessmentMinAggregateInputType = {
    id?: true;
    userId?: true;
    totalItems?: true;
    score?: true;
    takenAt?: true;
};
export type SelfRegAssessmentMaxAggregateInputType = {
    id?: true;
    userId?: true;
    totalItems?: true;
    score?: true;
    takenAt?: true;
};
export type SelfRegAssessmentCountAggregateInputType = {
    id?: true;
    userId?: true;
    totalItems?: true;
    score?: true;
    takenAt?: true;
    _all?: true;
};
export type SelfRegAssessmentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SelfRegAssessmentWhereInput;
    orderBy?: Prisma.SelfRegAssessmentOrderByWithRelationInput | Prisma.SelfRegAssessmentOrderByWithRelationInput[];
    cursor?: Prisma.SelfRegAssessmentWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SelfRegAssessmentCountAggregateInputType;
    _avg?: SelfRegAssessmentAvgAggregateInputType;
    _sum?: SelfRegAssessmentSumAggregateInputType;
    _min?: SelfRegAssessmentMinAggregateInputType;
    _max?: SelfRegAssessmentMaxAggregateInputType;
};
export type GetSelfRegAssessmentAggregateType<T extends SelfRegAssessmentAggregateArgs> = {
    [P in keyof T & keyof AggregateSelfRegAssessment]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSelfRegAssessment[P]> : Prisma.GetScalarType<T[P], AggregateSelfRegAssessment[P]>;
};
export type SelfRegAssessmentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SelfRegAssessmentWhereInput;
    orderBy?: Prisma.SelfRegAssessmentOrderByWithAggregationInput | Prisma.SelfRegAssessmentOrderByWithAggregationInput[];
    by: Prisma.SelfRegAssessmentScalarFieldEnum[] | Prisma.SelfRegAssessmentScalarFieldEnum;
    having?: Prisma.SelfRegAssessmentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SelfRegAssessmentCountAggregateInputType | true;
    _avg?: SelfRegAssessmentAvgAggregateInputType;
    _sum?: SelfRegAssessmentSumAggregateInputType;
    _min?: SelfRegAssessmentMinAggregateInputType;
    _max?: SelfRegAssessmentMaxAggregateInputType;
};
export type SelfRegAssessmentGroupByOutputType = {
    id: string;
    userId: string;
    totalItems: number;
    score: number;
    takenAt: Date;
    _count: SelfRegAssessmentCountAggregateOutputType | null;
    _avg: SelfRegAssessmentAvgAggregateOutputType | null;
    _sum: SelfRegAssessmentSumAggregateOutputType | null;
    _min: SelfRegAssessmentMinAggregateOutputType | null;
    _max: SelfRegAssessmentMaxAggregateOutputType | null;
};
type GetSelfRegAssessmentGroupByPayload<T extends SelfRegAssessmentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SelfRegAssessmentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SelfRegAssessmentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SelfRegAssessmentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SelfRegAssessmentGroupByOutputType[P]>;
}>>;
export type SelfRegAssessmentWhereInput = {
    AND?: Prisma.SelfRegAssessmentWhereInput | Prisma.SelfRegAssessmentWhereInput[];
    OR?: Prisma.SelfRegAssessmentWhereInput[];
    NOT?: Prisma.SelfRegAssessmentWhereInput | Prisma.SelfRegAssessmentWhereInput[];
    id?: Prisma.StringFilter<"SelfRegAssessment"> | string;
    userId?: Prisma.StringFilter<"SelfRegAssessment"> | string;
    totalItems?: Prisma.IntFilter<"SelfRegAssessment"> | number;
    score?: Prisma.IntFilter<"SelfRegAssessment"> | number;
    takenAt?: Prisma.DateTimeFilter<"SelfRegAssessment"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type SelfRegAssessmentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    totalItems?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    takenAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type SelfRegAssessmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.SelfRegAssessmentWhereInput | Prisma.SelfRegAssessmentWhereInput[];
    OR?: Prisma.SelfRegAssessmentWhereInput[];
    NOT?: Prisma.SelfRegAssessmentWhereInput | Prisma.SelfRegAssessmentWhereInput[];
    userId?: Prisma.StringFilter<"SelfRegAssessment"> | string;
    totalItems?: Prisma.IntFilter<"SelfRegAssessment"> | number;
    score?: Prisma.IntFilter<"SelfRegAssessment"> | number;
    takenAt?: Prisma.DateTimeFilter<"SelfRegAssessment"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type SelfRegAssessmentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    totalItems?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    takenAt?: Prisma.SortOrder;
    _count?: Prisma.SelfRegAssessmentCountOrderByAggregateInput;
    _avg?: Prisma.SelfRegAssessmentAvgOrderByAggregateInput;
    _max?: Prisma.SelfRegAssessmentMaxOrderByAggregateInput;
    _min?: Prisma.SelfRegAssessmentMinOrderByAggregateInput;
    _sum?: Prisma.SelfRegAssessmentSumOrderByAggregateInput;
};
export type SelfRegAssessmentScalarWhereWithAggregatesInput = {
    AND?: Prisma.SelfRegAssessmentScalarWhereWithAggregatesInput | Prisma.SelfRegAssessmentScalarWhereWithAggregatesInput[];
    OR?: Prisma.SelfRegAssessmentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SelfRegAssessmentScalarWhereWithAggregatesInput | Prisma.SelfRegAssessmentScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"SelfRegAssessment"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"SelfRegAssessment"> | string;
    totalItems?: Prisma.IntWithAggregatesFilter<"SelfRegAssessment"> | number;
    score?: Prisma.IntWithAggregatesFilter<"SelfRegAssessment"> | number;
    takenAt?: Prisma.DateTimeWithAggregatesFilter<"SelfRegAssessment"> | Date | string;
};
export type SelfRegAssessmentCreateInput = {
    id?: string;
    totalItems?: number;
    score: number;
    takenAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutSelfRegsInput;
};
export type SelfRegAssessmentUncheckedCreateInput = {
    id?: string;
    userId: string;
    totalItems?: number;
    score: number;
    takenAt?: Date | string;
};
export type SelfRegAssessmentUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    totalItems?: Prisma.IntFieldUpdateOperationsInput | number;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    takenAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutSelfRegsNestedInput;
};
export type SelfRegAssessmentUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    totalItems?: Prisma.IntFieldUpdateOperationsInput | number;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    takenAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SelfRegAssessmentCreateManyInput = {
    id?: string;
    userId: string;
    totalItems?: number;
    score: number;
    takenAt?: Date | string;
};
export type SelfRegAssessmentUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    totalItems?: Prisma.IntFieldUpdateOperationsInput | number;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    takenAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SelfRegAssessmentUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    totalItems?: Prisma.IntFieldUpdateOperationsInput | number;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    takenAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SelfRegAssessmentListRelationFilter = {
    every?: Prisma.SelfRegAssessmentWhereInput;
    some?: Prisma.SelfRegAssessmentWhereInput;
    none?: Prisma.SelfRegAssessmentWhereInput;
};
export type SelfRegAssessmentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SelfRegAssessmentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    totalItems?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    takenAt?: Prisma.SortOrder;
};
export type SelfRegAssessmentAvgOrderByAggregateInput = {
    totalItems?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
};
export type SelfRegAssessmentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    totalItems?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    takenAt?: Prisma.SortOrder;
};
export type SelfRegAssessmentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    totalItems?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    takenAt?: Prisma.SortOrder;
};
export type SelfRegAssessmentSumOrderByAggregateInput = {
    totalItems?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
};
export type SelfRegAssessmentCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.SelfRegAssessmentCreateWithoutUserInput, Prisma.SelfRegAssessmentUncheckedCreateWithoutUserInput> | Prisma.SelfRegAssessmentCreateWithoutUserInput[] | Prisma.SelfRegAssessmentUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.SelfRegAssessmentCreateOrConnectWithoutUserInput | Prisma.SelfRegAssessmentCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.SelfRegAssessmentCreateManyUserInputEnvelope;
    connect?: Prisma.SelfRegAssessmentWhereUniqueInput | Prisma.SelfRegAssessmentWhereUniqueInput[];
};
export type SelfRegAssessmentUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.SelfRegAssessmentCreateWithoutUserInput, Prisma.SelfRegAssessmentUncheckedCreateWithoutUserInput> | Prisma.SelfRegAssessmentCreateWithoutUserInput[] | Prisma.SelfRegAssessmentUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.SelfRegAssessmentCreateOrConnectWithoutUserInput | Prisma.SelfRegAssessmentCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.SelfRegAssessmentCreateManyUserInputEnvelope;
    connect?: Prisma.SelfRegAssessmentWhereUniqueInput | Prisma.SelfRegAssessmentWhereUniqueInput[];
};
export type SelfRegAssessmentUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.SelfRegAssessmentCreateWithoutUserInput, Prisma.SelfRegAssessmentUncheckedCreateWithoutUserInput> | Prisma.SelfRegAssessmentCreateWithoutUserInput[] | Prisma.SelfRegAssessmentUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.SelfRegAssessmentCreateOrConnectWithoutUserInput | Prisma.SelfRegAssessmentCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.SelfRegAssessmentUpsertWithWhereUniqueWithoutUserInput | Prisma.SelfRegAssessmentUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.SelfRegAssessmentCreateManyUserInputEnvelope;
    set?: Prisma.SelfRegAssessmentWhereUniqueInput | Prisma.SelfRegAssessmentWhereUniqueInput[];
    disconnect?: Prisma.SelfRegAssessmentWhereUniqueInput | Prisma.SelfRegAssessmentWhereUniqueInput[];
    delete?: Prisma.SelfRegAssessmentWhereUniqueInput | Prisma.SelfRegAssessmentWhereUniqueInput[];
    connect?: Prisma.SelfRegAssessmentWhereUniqueInput | Prisma.SelfRegAssessmentWhereUniqueInput[];
    update?: Prisma.SelfRegAssessmentUpdateWithWhereUniqueWithoutUserInput | Prisma.SelfRegAssessmentUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.SelfRegAssessmentUpdateManyWithWhereWithoutUserInput | Prisma.SelfRegAssessmentUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.SelfRegAssessmentScalarWhereInput | Prisma.SelfRegAssessmentScalarWhereInput[];
};
export type SelfRegAssessmentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.SelfRegAssessmentCreateWithoutUserInput, Prisma.SelfRegAssessmentUncheckedCreateWithoutUserInput> | Prisma.SelfRegAssessmentCreateWithoutUserInput[] | Prisma.SelfRegAssessmentUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.SelfRegAssessmentCreateOrConnectWithoutUserInput | Prisma.SelfRegAssessmentCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.SelfRegAssessmentUpsertWithWhereUniqueWithoutUserInput | Prisma.SelfRegAssessmentUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.SelfRegAssessmentCreateManyUserInputEnvelope;
    set?: Prisma.SelfRegAssessmentWhereUniqueInput | Prisma.SelfRegAssessmentWhereUniqueInput[];
    disconnect?: Prisma.SelfRegAssessmentWhereUniqueInput | Prisma.SelfRegAssessmentWhereUniqueInput[];
    delete?: Prisma.SelfRegAssessmentWhereUniqueInput | Prisma.SelfRegAssessmentWhereUniqueInput[];
    connect?: Prisma.SelfRegAssessmentWhereUniqueInput | Prisma.SelfRegAssessmentWhereUniqueInput[];
    update?: Prisma.SelfRegAssessmentUpdateWithWhereUniqueWithoutUserInput | Prisma.SelfRegAssessmentUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.SelfRegAssessmentUpdateManyWithWhereWithoutUserInput | Prisma.SelfRegAssessmentUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.SelfRegAssessmentScalarWhereInput | Prisma.SelfRegAssessmentScalarWhereInput[];
};
export type SelfRegAssessmentCreateWithoutUserInput = {
    id?: string;
    totalItems?: number;
    score: number;
    takenAt?: Date | string;
};
export type SelfRegAssessmentUncheckedCreateWithoutUserInput = {
    id?: string;
    totalItems?: number;
    score: number;
    takenAt?: Date | string;
};
export type SelfRegAssessmentCreateOrConnectWithoutUserInput = {
    where: Prisma.SelfRegAssessmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.SelfRegAssessmentCreateWithoutUserInput, Prisma.SelfRegAssessmentUncheckedCreateWithoutUserInput>;
};
export type SelfRegAssessmentCreateManyUserInputEnvelope = {
    data: Prisma.SelfRegAssessmentCreateManyUserInput | Prisma.SelfRegAssessmentCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type SelfRegAssessmentUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.SelfRegAssessmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.SelfRegAssessmentUpdateWithoutUserInput, Prisma.SelfRegAssessmentUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.SelfRegAssessmentCreateWithoutUserInput, Prisma.SelfRegAssessmentUncheckedCreateWithoutUserInput>;
};
export type SelfRegAssessmentUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.SelfRegAssessmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.SelfRegAssessmentUpdateWithoutUserInput, Prisma.SelfRegAssessmentUncheckedUpdateWithoutUserInput>;
};
export type SelfRegAssessmentUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.SelfRegAssessmentScalarWhereInput;
    data: Prisma.XOR<Prisma.SelfRegAssessmentUpdateManyMutationInput, Prisma.SelfRegAssessmentUncheckedUpdateManyWithoutUserInput>;
};
export type SelfRegAssessmentScalarWhereInput = {
    AND?: Prisma.SelfRegAssessmentScalarWhereInput | Prisma.SelfRegAssessmentScalarWhereInput[];
    OR?: Prisma.SelfRegAssessmentScalarWhereInput[];
    NOT?: Prisma.SelfRegAssessmentScalarWhereInput | Prisma.SelfRegAssessmentScalarWhereInput[];
    id?: Prisma.StringFilter<"SelfRegAssessment"> | string;
    userId?: Prisma.StringFilter<"SelfRegAssessment"> | string;
    totalItems?: Prisma.IntFilter<"SelfRegAssessment"> | number;
    score?: Prisma.IntFilter<"SelfRegAssessment"> | number;
    takenAt?: Prisma.DateTimeFilter<"SelfRegAssessment"> | Date | string;
};
export type SelfRegAssessmentCreateManyUserInput = {
    id?: string;
    totalItems?: number;
    score: number;
    takenAt?: Date | string;
};
export type SelfRegAssessmentUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    totalItems?: Prisma.IntFieldUpdateOperationsInput | number;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    takenAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SelfRegAssessmentUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    totalItems?: Prisma.IntFieldUpdateOperationsInput | number;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    takenAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SelfRegAssessmentUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    totalItems?: Prisma.IntFieldUpdateOperationsInput | number;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    takenAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SelfRegAssessmentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    totalItems?: boolean;
    score?: boolean;
    takenAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["selfRegAssessment"]>;
export type SelfRegAssessmentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    totalItems?: boolean;
    score?: boolean;
    takenAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["selfRegAssessment"]>;
export type SelfRegAssessmentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    totalItems?: boolean;
    score?: boolean;
    takenAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["selfRegAssessment"]>;
export type SelfRegAssessmentSelectScalar = {
    id?: boolean;
    userId?: boolean;
    totalItems?: boolean;
    score?: boolean;
    takenAt?: boolean;
};
export type SelfRegAssessmentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "totalItems" | "score" | "takenAt", ExtArgs["result"]["selfRegAssessment"]>;
export type SelfRegAssessmentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type SelfRegAssessmentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type SelfRegAssessmentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $SelfRegAssessmentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "SelfRegAssessment";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        totalItems: number;
        score: number;
        takenAt: Date;
    }, ExtArgs["result"]["selfRegAssessment"]>;
    composites: {};
};
export type SelfRegAssessmentGetPayload<S extends boolean | null | undefined | SelfRegAssessmentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SelfRegAssessmentPayload, S>;
export type SelfRegAssessmentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SelfRegAssessmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SelfRegAssessmentCountAggregateInputType | true;
};
export interface SelfRegAssessmentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['SelfRegAssessment'];
        meta: {
            name: 'SelfRegAssessment';
        };
    };
    findUnique<T extends SelfRegAssessmentFindUniqueArgs>(args: Prisma.SelectSubset<T, SelfRegAssessmentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SelfRegAssessmentClient<runtime.Types.Result.GetResult<Prisma.$SelfRegAssessmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SelfRegAssessmentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SelfRegAssessmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SelfRegAssessmentClient<runtime.Types.Result.GetResult<Prisma.$SelfRegAssessmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SelfRegAssessmentFindFirstArgs>(args?: Prisma.SelectSubset<T, SelfRegAssessmentFindFirstArgs<ExtArgs>>): Prisma.Prisma__SelfRegAssessmentClient<runtime.Types.Result.GetResult<Prisma.$SelfRegAssessmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SelfRegAssessmentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SelfRegAssessmentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SelfRegAssessmentClient<runtime.Types.Result.GetResult<Prisma.$SelfRegAssessmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SelfRegAssessmentFindManyArgs>(args?: Prisma.SelectSubset<T, SelfRegAssessmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SelfRegAssessmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SelfRegAssessmentCreateArgs>(args: Prisma.SelectSubset<T, SelfRegAssessmentCreateArgs<ExtArgs>>): Prisma.Prisma__SelfRegAssessmentClient<runtime.Types.Result.GetResult<Prisma.$SelfRegAssessmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SelfRegAssessmentCreateManyArgs>(args?: Prisma.SelectSubset<T, SelfRegAssessmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends SelfRegAssessmentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SelfRegAssessmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SelfRegAssessmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends SelfRegAssessmentDeleteArgs>(args: Prisma.SelectSubset<T, SelfRegAssessmentDeleteArgs<ExtArgs>>): Prisma.Prisma__SelfRegAssessmentClient<runtime.Types.Result.GetResult<Prisma.$SelfRegAssessmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SelfRegAssessmentUpdateArgs>(args: Prisma.SelectSubset<T, SelfRegAssessmentUpdateArgs<ExtArgs>>): Prisma.Prisma__SelfRegAssessmentClient<runtime.Types.Result.GetResult<Prisma.$SelfRegAssessmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SelfRegAssessmentDeleteManyArgs>(args?: Prisma.SelectSubset<T, SelfRegAssessmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SelfRegAssessmentUpdateManyArgs>(args: Prisma.SelectSubset<T, SelfRegAssessmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends SelfRegAssessmentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SelfRegAssessmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SelfRegAssessmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends SelfRegAssessmentUpsertArgs>(args: Prisma.SelectSubset<T, SelfRegAssessmentUpsertArgs<ExtArgs>>): Prisma.Prisma__SelfRegAssessmentClient<runtime.Types.Result.GetResult<Prisma.$SelfRegAssessmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SelfRegAssessmentCountArgs>(args?: Prisma.Subset<T, SelfRegAssessmentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SelfRegAssessmentCountAggregateOutputType> : number>;
    aggregate<T extends SelfRegAssessmentAggregateArgs>(args: Prisma.Subset<T, SelfRegAssessmentAggregateArgs>): Prisma.PrismaPromise<GetSelfRegAssessmentAggregateType<T>>;
    groupBy<T extends SelfRegAssessmentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SelfRegAssessmentGroupByArgs['orderBy'];
    } : {
        orderBy?: SelfRegAssessmentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SelfRegAssessmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSelfRegAssessmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SelfRegAssessmentFieldRefs;
}
export interface Prisma__SelfRegAssessmentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SelfRegAssessmentFieldRefs {
    readonly id: Prisma.FieldRef<"SelfRegAssessment", 'String'>;
    readonly userId: Prisma.FieldRef<"SelfRegAssessment", 'String'>;
    readonly totalItems: Prisma.FieldRef<"SelfRegAssessment", 'Int'>;
    readonly score: Prisma.FieldRef<"SelfRegAssessment", 'Int'>;
    readonly takenAt: Prisma.FieldRef<"SelfRegAssessment", 'DateTime'>;
}
export type SelfRegAssessmentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SelfRegAssessmentSelect<ExtArgs> | null;
    omit?: Prisma.SelfRegAssessmentOmit<ExtArgs> | null;
    include?: Prisma.SelfRegAssessmentInclude<ExtArgs> | null;
    where: Prisma.SelfRegAssessmentWhereUniqueInput;
};
export type SelfRegAssessmentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SelfRegAssessmentSelect<ExtArgs> | null;
    omit?: Prisma.SelfRegAssessmentOmit<ExtArgs> | null;
    include?: Prisma.SelfRegAssessmentInclude<ExtArgs> | null;
    where: Prisma.SelfRegAssessmentWhereUniqueInput;
};
export type SelfRegAssessmentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SelfRegAssessmentSelect<ExtArgs> | null;
    omit?: Prisma.SelfRegAssessmentOmit<ExtArgs> | null;
    include?: Prisma.SelfRegAssessmentInclude<ExtArgs> | null;
    where?: Prisma.SelfRegAssessmentWhereInput;
    orderBy?: Prisma.SelfRegAssessmentOrderByWithRelationInput | Prisma.SelfRegAssessmentOrderByWithRelationInput[];
    cursor?: Prisma.SelfRegAssessmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SelfRegAssessmentScalarFieldEnum | Prisma.SelfRegAssessmentScalarFieldEnum[];
};
export type SelfRegAssessmentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SelfRegAssessmentSelect<ExtArgs> | null;
    omit?: Prisma.SelfRegAssessmentOmit<ExtArgs> | null;
    include?: Prisma.SelfRegAssessmentInclude<ExtArgs> | null;
    where?: Prisma.SelfRegAssessmentWhereInput;
    orderBy?: Prisma.SelfRegAssessmentOrderByWithRelationInput | Prisma.SelfRegAssessmentOrderByWithRelationInput[];
    cursor?: Prisma.SelfRegAssessmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SelfRegAssessmentScalarFieldEnum | Prisma.SelfRegAssessmentScalarFieldEnum[];
};
export type SelfRegAssessmentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SelfRegAssessmentSelect<ExtArgs> | null;
    omit?: Prisma.SelfRegAssessmentOmit<ExtArgs> | null;
    include?: Prisma.SelfRegAssessmentInclude<ExtArgs> | null;
    where?: Prisma.SelfRegAssessmentWhereInput;
    orderBy?: Prisma.SelfRegAssessmentOrderByWithRelationInput | Prisma.SelfRegAssessmentOrderByWithRelationInput[];
    cursor?: Prisma.SelfRegAssessmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SelfRegAssessmentScalarFieldEnum | Prisma.SelfRegAssessmentScalarFieldEnum[];
};
export type SelfRegAssessmentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SelfRegAssessmentSelect<ExtArgs> | null;
    omit?: Prisma.SelfRegAssessmentOmit<ExtArgs> | null;
    include?: Prisma.SelfRegAssessmentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SelfRegAssessmentCreateInput, Prisma.SelfRegAssessmentUncheckedCreateInput>;
};
export type SelfRegAssessmentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SelfRegAssessmentCreateManyInput | Prisma.SelfRegAssessmentCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SelfRegAssessmentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SelfRegAssessmentSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SelfRegAssessmentOmit<ExtArgs> | null;
    data: Prisma.SelfRegAssessmentCreateManyInput | Prisma.SelfRegAssessmentCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.SelfRegAssessmentIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type SelfRegAssessmentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SelfRegAssessmentSelect<ExtArgs> | null;
    omit?: Prisma.SelfRegAssessmentOmit<ExtArgs> | null;
    include?: Prisma.SelfRegAssessmentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SelfRegAssessmentUpdateInput, Prisma.SelfRegAssessmentUncheckedUpdateInput>;
    where: Prisma.SelfRegAssessmentWhereUniqueInput;
};
export type SelfRegAssessmentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SelfRegAssessmentUpdateManyMutationInput, Prisma.SelfRegAssessmentUncheckedUpdateManyInput>;
    where?: Prisma.SelfRegAssessmentWhereInput;
    limit?: number;
};
export type SelfRegAssessmentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SelfRegAssessmentSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SelfRegAssessmentOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SelfRegAssessmentUpdateManyMutationInput, Prisma.SelfRegAssessmentUncheckedUpdateManyInput>;
    where?: Prisma.SelfRegAssessmentWhereInput;
    limit?: number;
    include?: Prisma.SelfRegAssessmentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type SelfRegAssessmentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SelfRegAssessmentSelect<ExtArgs> | null;
    omit?: Prisma.SelfRegAssessmentOmit<ExtArgs> | null;
    include?: Prisma.SelfRegAssessmentInclude<ExtArgs> | null;
    where: Prisma.SelfRegAssessmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.SelfRegAssessmentCreateInput, Prisma.SelfRegAssessmentUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SelfRegAssessmentUpdateInput, Prisma.SelfRegAssessmentUncheckedUpdateInput>;
};
export type SelfRegAssessmentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SelfRegAssessmentSelect<ExtArgs> | null;
    omit?: Prisma.SelfRegAssessmentOmit<ExtArgs> | null;
    include?: Prisma.SelfRegAssessmentInclude<ExtArgs> | null;
    where: Prisma.SelfRegAssessmentWhereUniqueInput;
};
export type SelfRegAssessmentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SelfRegAssessmentWhereInput;
    limit?: number;
};
export type SelfRegAssessmentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SelfRegAssessmentSelect<ExtArgs> | null;
    omit?: Prisma.SelfRegAssessmentOmit<ExtArgs> | null;
    include?: Prisma.SelfRegAssessmentInclude<ExtArgs> | null;
};
export {};
