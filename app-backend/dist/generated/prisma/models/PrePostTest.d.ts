import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type PrePostTestModel = runtime.Types.Result.DefaultSelection<Prisma.$PrePostTestPayload>;
export type AggregatePrePostTest = {
    _count: PrePostTestCountAggregateOutputType | null;
    _avg: PrePostTestAvgAggregateOutputType | null;
    _sum: PrePostTestSumAggregateOutputType | null;
    _min: PrePostTestMinAggregateOutputType | null;
    _max: PrePostTestMaxAggregateOutputType | null;
};
export type PrePostTestAvgAggregateOutputType = {
    totalItems: number | null;
    score: number | null;
};
export type PrePostTestSumAggregateOutputType = {
    totalItems: number | null;
    score: number | null;
};
export type PrePostTestMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    type: $Enums.PrePostType | null;
    totalItems: number | null;
    score: number | null;
    takenAt: Date | null;
};
export type PrePostTestMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    type: $Enums.PrePostType | null;
    totalItems: number | null;
    score: number | null;
    takenAt: Date | null;
};
export type PrePostTestCountAggregateOutputType = {
    id: number;
    userId: number;
    type: number;
    totalItems: number;
    score: number;
    takenAt: number;
    _all: number;
};
export type PrePostTestAvgAggregateInputType = {
    totalItems?: true;
    score?: true;
};
export type PrePostTestSumAggregateInputType = {
    totalItems?: true;
    score?: true;
};
export type PrePostTestMinAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    totalItems?: true;
    score?: true;
    takenAt?: true;
};
export type PrePostTestMaxAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    totalItems?: true;
    score?: true;
    takenAt?: true;
};
export type PrePostTestCountAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    totalItems?: true;
    score?: true;
    takenAt?: true;
    _all?: true;
};
export type PrePostTestAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PrePostTestWhereInput;
    orderBy?: Prisma.PrePostTestOrderByWithRelationInput | Prisma.PrePostTestOrderByWithRelationInput[];
    cursor?: Prisma.PrePostTestWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PrePostTestCountAggregateInputType;
    _avg?: PrePostTestAvgAggregateInputType;
    _sum?: PrePostTestSumAggregateInputType;
    _min?: PrePostTestMinAggregateInputType;
    _max?: PrePostTestMaxAggregateInputType;
};
export type GetPrePostTestAggregateType<T extends PrePostTestAggregateArgs> = {
    [P in keyof T & keyof AggregatePrePostTest]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePrePostTest[P]> : Prisma.GetScalarType<T[P], AggregatePrePostTest[P]>;
};
export type PrePostTestGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PrePostTestWhereInput;
    orderBy?: Prisma.PrePostTestOrderByWithAggregationInput | Prisma.PrePostTestOrderByWithAggregationInput[];
    by: Prisma.PrePostTestScalarFieldEnum[] | Prisma.PrePostTestScalarFieldEnum;
    having?: Prisma.PrePostTestScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PrePostTestCountAggregateInputType | true;
    _avg?: PrePostTestAvgAggregateInputType;
    _sum?: PrePostTestSumAggregateInputType;
    _min?: PrePostTestMinAggregateInputType;
    _max?: PrePostTestMaxAggregateInputType;
};
export type PrePostTestGroupByOutputType = {
    id: string;
    userId: string;
    type: $Enums.PrePostType;
    totalItems: number;
    score: number;
    takenAt: Date;
    _count: PrePostTestCountAggregateOutputType | null;
    _avg: PrePostTestAvgAggregateOutputType | null;
    _sum: PrePostTestSumAggregateOutputType | null;
    _min: PrePostTestMinAggregateOutputType | null;
    _max: PrePostTestMaxAggregateOutputType | null;
};
type GetPrePostTestGroupByPayload<T extends PrePostTestGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PrePostTestGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PrePostTestGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PrePostTestGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PrePostTestGroupByOutputType[P]>;
}>>;
export type PrePostTestWhereInput = {
    AND?: Prisma.PrePostTestWhereInput | Prisma.PrePostTestWhereInput[];
    OR?: Prisma.PrePostTestWhereInput[];
    NOT?: Prisma.PrePostTestWhereInput | Prisma.PrePostTestWhereInput[];
    id?: Prisma.StringFilter<"PrePostTest"> | string;
    userId?: Prisma.StringFilter<"PrePostTest"> | string;
    type?: Prisma.EnumPrePostTypeFilter<"PrePostTest"> | $Enums.PrePostType;
    totalItems?: Prisma.IntFilter<"PrePostTest"> | number;
    score?: Prisma.IntFilter<"PrePostTest"> | number;
    takenAt?: Prisma.DateTimeFilter<"PrePostTest"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type PrePostTestOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    totalItems?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    takenAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type PrePostTestWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.PrePostTestWhereInput | Prisma.PrePostTestWhereInput[];
    OR?: Prisma.PrePostTestWhereInput[];
    NOT?: Prisma.PrePostTestWhereInput | Prisma.PrePostTestWhereInput[];
    userId?: Prisma.StringFilter<"PrePostTest"> | string;
    type?: Prisma.EnumPrePostTypeFilter<"PrePostTest"> | $Enums.PrePostType;
    totalItems?: Prisma.IntFilter<"PrePostTest"> | number;
    score?: Prisma.IntFilter<"PrePostTest"> | number;
    takenAt?: Prisma.DateTimeFilter<"PrePostTest"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type PrePostTestOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    totalItems?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    takenAt?: Prisma.SortOrder;
    _count?: Prisma.PrePostTestCountOrderByAggregateInput;
    _avg?: Prisma.PrePostTestAvgOrderByAggregateInput;
    _max?: Prisma.PrePostTestMaxOrderByAggregateInput;
    _min?: Prisma.PrePostTestMinOrderByAggregateInput;
    _sum?: Prisma.PrePostTestSumOrderByAggregateInput;
};
export type PrePostTestScalarWhereWithAggregatesInput = {
    AND?: Prisma.PrePostTestScalarWhereWithAggregatesInput | Prisma.PrePostTestScalarWhereWithAggregatesInput[];
    OR?: Prisma.PrePostTestScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PrePostTestScalarWhereWithAggregatesInput | Prisma.PrePostTestScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PrePostTest"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"PrePostTest"> | string;
    type?: Prisma.EnumPrePostTypeWithAggregatesFilter<"PrePostTest"> | $Enums.PrePostType;
    totalItems?: Prisma.IntWithAggregatesFilter<"PrePostTest"> | number;
    score?: Prisma.IntWithAggregatesFilter<"PrePostTest"> | number;
    takenAt?: Prisma.DateTimeWithAggregatesFilter<"PrePostTest"> | Date | string;
};
export type PrePostTestCreateInput = {
    id?: string;
    type: $Enums.PrePostType;
    totalItems?: number;
    score: number;
    takenAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutPrePostTestsInput;
};
export type PrePostTestUncheckedCreateInput = {
    id?: string;
    userId: string;
    type: $Enums.PrePostType;
    totalItems?: number;
    score: number;
    takenAt?: Date | string;
};
export type PrePostTestUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumPrePostTypeFieldUpdateOperationsInput | $Enums.PrePostType;
    totalItems?: Prisma.IntFieldUpdateOperationsInput | number;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    takenAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutPrePostTestsNestedInput;
};
export type PrePostTestUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumPrePostTypeFieldUpdateOperationsInput | $Enums.PrePostType;
    totalItems?: Prisma.IntFieldUpdateOperationsInput | number;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    takenAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PrePostTestCreateManyInput = {
    id?: string;
    userId: string;
    type: $Enums.PrePostType;
    totalItems?: number;
    score: number;
    takenAt?: Date | string;
};
export type PrePostTestUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumPrePostTypeFieldUpdateOperationsInput | $Enums.PrePostType;
    totalItems?: Prisma.IntFieldUpdateOperationsInput | number;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    takenAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PrePostTestUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumPrePostTypeFieldUpdateOperationsInput | $Enums.PrePostType;
    totalItems?: Prisma.IntFieldUpdateOperationsInput | number;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    takenAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PrePostTestListRelationFilter = {
    every?: Prisma.PrePostTestWhereInput;
    some?: Prisma.PrePostTestWhereInput;
    none?: Prisma.PrePostTestWhereInput;
};
export type PrePostTestOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PrePostTestCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    totalItems?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    takenAt?: Prisma.SortOrder;
};
export type PrePostTestAvgOrderByAggregateInput = {
    totalItems?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
};
export type PrePostTestMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    totalItems?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    takenAt?: Prisma.SortOrder;
};
export type PrePostTestMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    totalItems?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    takenAt?: Prisma.SortOrder;
};
export type PrePostTestSumOrderByAggregateInput = {
    totalItems?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
};
export type PrePostTestCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PrePostTestCreateWithoutUserInput, Prisma.PrePostTestUncheckedCreateWithoutUserInput> | Prisma.PrePostTestCreateWithoutUserInput[] | Prisma.PrePostTestUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PrePostTestCreateOrConnectWithoutUserInput | Prisma.PrePostTestCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PrePostTestCreateManyUserInputEnvelope;
    connect?: Prisma.PrePostTestWhereUniqueInput | Prisma.PrePostTestWhereUniqueInput[];
};
export type PrePostTestUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PrePostTestCreateWithoutUserInput, Prisma.PrePostTestUncheckedCreateWithoutUserInput> | Prisma.PrePostTestCreateWithoutUserInput[] | Prisma.PrePostTestUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PrePostTestCreateOrConnectWithoutUserInput | Prisma.PrePostTestCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PrePostTestCreateManyUserInputEnvelope;
    connect?: Prisma.PrePostTestWhereUniqueInput | Prisma.PrePostTestWhereUniqueInput[];
};
export type PrePostTestUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PrePostTestCreateWithoutUserInput, Prisma.PrePostTestUncheckedCreateWithoutUserInput> | Prisma.PrePostTestCreateWithoutUserInput[] | Prisma.PrePostTestUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PrePostTestCreateOrConnectWithoutUserInput | Prisma.PrePostTestCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PrePostTestUpsertWithWhereUniqueWithoutUserInput | Prisma.PrePostTestUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PrePostTestCreateManyUserInputEnvelope;
    set?: Prisma.PrePostTestWhereUniqueInput | Prisma.PrePostTestWhereUniqueInput[];
    disconnect?: Prisma.PrePostTestWhereUniqueInput | Prisma.PrePostTestWhereUniqueInput[];
    delete?: Prisma.PrePostTestWhereUniqueInput | Prisma.PrePostTestWhereUniqueInput[];
    connect?: Prisma.PrePostTestWhereUniqueInput | Prisma.PrePostTestWhereUniqueInput[];
    update?: Prisma.PrePostTestUpdateWithWhereUniqueWithoutUserInput | Prisma.PrePostTestUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PrePostTestUpdateManyWithWhereWithoutUserInput | Prisma.PrePostTestUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PrePostTestScalarWhereInput | Prisma.PrePostTestScalarWhereInput[];
};
export type PrePostTestUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PrePostTestCreateWithoutUserInput, Prisma.PrePostTestUncheckedCreateWithoutUserInput> | Prisma.PrePostTestCreateWithoutUserInput[] | Prisma.PrePostTestUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PrePostTestCreateOrConnectWithoutUserInput | Prisma.PrePostTestCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PrePostTestUpsertWithWhereUniqueWithoutUserInput | Prisma.PrePostTestUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PrePostTestCreateManyUserInputEnvelope;
    set?: Prisma.PrePostTestWhereUniqueInput | Prisma.PrePostTestWhereUniqueInput[];
    disconnect?: Prisma.PrePostTestWhereUniqueInput | Prisma.PrePostTestWhereUniqueInput[];
    delete?: Prisma.PrePostTestWhereUniqueInput | Prisma.PrePostTestWhereUniqueInput[];
    connect?: Prisma.PrePostTestWhereUniqueInput | Prisma.PrePostTestWhereUniqueInput[];
    update?: Prisma.PrePostTestUpdateWithWhereUniqueWithoutUserInput | Prisma.PrePostTestUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PrePostTestUpdateManyWithWhereWithoutUserInput | Prisma.PrePostTestUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PrePostTestScalarWhereInput | Prisma.PrePostTestScalarWhereInput[];
};
export type EnumPrePostTypeFieldUpdateOperationsInput = {
    set?: $Enums.PrePostType;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type PrePostTestCreateWithoutUserInput = {
    id?: string;
    type: $Enums.PrePostType;
    totalItems?: number;
    score: number;
    takenAt?: Date | string;
};
export type PrePostTestUncheckedCreateWithoutUserInput = {
    id?: string;
    type: $Enums.PrePostType;
    totalItems?: number;
    score: number;
    takenAt?: Date | string;
};
export type PrePostTestCreateOrConnectWithoutUserInput = {
    where: Prisma.PrePostTestWhereUniqueInput;
    create: Prisma.XOR<Prisma.PrePostTestCreateWithoutUserInput, Prisma.PrePostTestUncheckedCreateWithoutUserInput>;
};
export type PrePostTestCreateManyUserInputEnvelope = {
    data: Prisma.PrePostTestCreateManyUserInput | Prisma.PrePostTestCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type PrePostTestUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.PrePostTestWhereUniqueInput;
    update: Prisma.XOR<Prisma.PrePostTestUpdateWithoutUserInput, Prisma.PrePostTestUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.PrePostTestCreateWithoutUserInput, Prisma.PrePostTestUncheckedCreateWithoutUserInput>;
};
export type PrePostTestUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.PrePostTestWhereUniqueInput;
    data: Prisma.XOR<Prisma.PrePostTestUpdateWithoutUserInput, Prisma.PrePostTestUncheckedUpdateWithoutUserInput>;
};
export type PrePostTestUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.PrePostTestScalarWhereInput;
    data: Prisma.XOR<Prisma.PrePostTestUpdateManyMutationInput, Prisma.PrePostTestUncheckedUpdateManyWithoutUserInput>;
};
export type PrePostTestScalarWhereInput = {
    AND?: Prisma.PrePostTestScalarWhereInput | Prisma.PrePostTestScalarWhereInput[];
    OR?: Prisma.PrePostTestScalarWhereInput[];
    NOT?: Prisma.PrePostTestScalarWhereInput | Prisma.PrePostTestScalarWhereInput[];
    id?: Prisma.StringFilter<"PrePostTest"> | string;
    userId?: Prisma.StringFilter<"PrePostTest"> | string;
    type?: Prisma.EnumPrePostTypeFilter<"PrePostTest"> | $Enums.PrePostType;
    totalItems?: Prisma.IntFilter<"PrePostTest"> | number;
    score?: Prisma.IntFilter<"PrePostTest"> | number;
    takenAt?: Prisma.DateTimeFilter<"PrePostTest"> | Date | string;
};
export type PrePostTestCreateManyUserInput = {
    id?: string;
    type: $Enums.PrePostType;
    totalItems?: number;
    score: number;
    takenAt?: Date | string;
};
export type PrePostTestUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumPrePostTypeFieldUpdateOperationsInput | $Enums.PrePostType;
    totalItems?: Prisma.IntFieldUpdateOperationsInput | number;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    takenAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PrePostTestUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumPrePostTypeFieldUpdateOperationsInput | $Enums.PrePostType;
    totalItems?: Prisma.IntFieldUpdateOperationsInput | number;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    takenAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PrePostTestUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumPrePostTypeFieldUpdateOperationsInput | $Enums.PrePostType;
    totalItems?: Prisma.IntFieldUpdateOperationsInput | number;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    takenAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PrePostTestSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    totalItems?: boolean;
    score?: boolean;
    takenAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["prePostTest"]>;
export type PrePostTestSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    totalItems?: boolean;
    score?: boolean;
    takenAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["prePostTest"]>;
export type PrePostTestSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    totalItems?: boolean;
    score?: boolean;
    takenAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["prePostTest"]>;
export type PrePostTestSelectScalar = {
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    totalItems?: boolean;
    score?: boolean;
    takenAt?: boolean;
};
export type PrePostTestOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "type" | "totalItems" | "score" | "takenAt", ExtArgs["result"]["prePostTest"]>;
export type PrePostTestInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type PrePostTestIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type PrePostTestIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $PrePostTestPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PrePostTest";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        type: $Enums.PrePostType;
        totalItems: number;
        score: number;
        takenAt: Date;
    }, ExtArgs["result"]["prePostTest"]>;
    composites: {};
};
export type PrePostTestGetPayload<S extends boolean | null | undefined | PrePostTestDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PrePostTestPayload, S>;
export type PrePostTestCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PrePostTestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PrePostTestCountAggregateInputType | true;
};
export interface PrePostTestDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PrePostTest'];
        meta: {
            name: 'PrePostTest';
        };
    };
    findUnique<T extends PrePostTestFindUniqueArgs>(args: Prisma.SelectSubset<T, PrePostTestFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PrePostTestClient<runtime.Types.Result.GetResult<Prisma.$PrePostTestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PrePostTestFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PrePostTestFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PrePostTestClient<runtime.Types.Result.GetResult<Prisma.$PrePostTestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PrePostTestFindFirstArgs>(args?: Prisma.SelectSubset<T, PrePostTestFindFirstArgs<ExtArgs>>): Prisma.Prisma__PrePostTestClient<runtime.Types.Result.GetResult<Prisma.$PrePostTestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PrePostTestFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PrePostTestFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PrePostTestClient<runtime.Types.Result.GetResult<Prisma.$PrePostTestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PrePostTestFindManyArgs>(args?: Prisma.SelectSubset<T, PrePostTestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PrePostTestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PrePostTestCreateArgs>(args: Prisma.SelectSubset<T, PrePostTestCreateArgs<ExtArgs>>): Prisma.Prisma__PrePostTestClient<runtime.Types.Result.GetResult<Prisma.$PrePostTestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PrePostTestCreateManyArgs>(args?: Prisma.SelectSubset<T, PrePostTestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PrePostTestCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PrePostTestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PrePostTestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PrePostTestDeleteArgs>(args: Prisma.SelectSubset<T, PrePostTestDeleteArgs<ExtArgs>>): Prisma.Prisma__PrePostTestClient<runtime.Types.Result.GetResult<Prisma.$PrePostTestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PrePostTestUpdateArgs>(args: Prisma.SelectSubset<T, PrePostTestUpdateArgs<ExtArgs>>): Prisma.Prisma__PrePostTestClient<runtime.Types.Result.GetResult<Prisma.$PrePostTestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PrePostTestDeleteManyArgs>(args?: Prisma.SelectSubset<T, PrePostTestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PrePostTestUpdateManyArgs>(args: Prisma.SelectSubset<T, PrePostTestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PrePostTestUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PrePostTestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PrePostTestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PrePostTestUpsertArgs>(args: Prisma.SelectSubset<T, PrePostTestUpsertArgs<ExtArgs>>): Prisma.Prisma__PrePostTestClient<runtime.Types.Result.GetResult<Prisma.$PrePostTestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PrePostTestCountArgs>(args?: Prisma.Subset<T, PrePostTestCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PrePostTestCountAggregateOutputType> : number>;
    aggregate<T extends PrePostTestAggregateArgs>(args: Prisma.Subset<T, PrePostTestAggregateArgs>): Prisma.PrismaPromise<GetPrePostTestAggregateType<T>>;
    groupBy<T extends PrePostTestGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PrePostTestGroupByArgs['orderBy'];
    } : {
        orderBy?: PrePostTestGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PrePostTestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPrePostTestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PrePostTestFieldRefs;
}
export interface Prisma__PrePostTestClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PrePostTestFieldRefs {
    readonly id: Prisma.FieldRef<"PrePostTest", 'String'>;
    readonly userId: Prisma.FieldRef<"PrePostTest", 'String'>;
    readonly type: Prisma.FieldRef<"PrePostTest", 'PrePostType'>;
    readonly totalItems: Prisma.FieldRef<"PrePostTest", 'Int'>;
    readonly score: Prisma.FieldRef<"PrePostTest", 'Int'>;
    readonly takenAt: Prisma.FieldRef<"PrePostTest", 'DateTime'>;
}
export type PrePostTestFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrePostTestSelect<ExtArgs> | null;
    omit?: Prisma.PrePostTestOmit<ExtArgs> | null;
    include?: Prisma.PrePostTestInclude<ExtArgs> | null;
    where: Prisma.PrePostTestWhereUniqueInput;
};
export type PrePostTestFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrePostTestSelect<ExtArgs> | null;
    omit?: Prisma.PrePostTestOmit<ExtArgs> | null;
    include?: Prisma.PrePostTestInclude<ExtArgs> | null;
    where: Prisma.PrePostTestWhereUniqueInput;
};
export type PrePostTestFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrePostTestSelect<ExtArgs> | null;
    omit?: Prisma.PrePostTestOmit<ExtArgs> | null;
    include?: Prisma.PrePostTestInclude<ExtArgs> | null;
    where?: Prisma.PrePostTestWhereInput;
    orderBy?: Prisma.PrePostTestOrderByWithRelationInput | Prisma.PrePostTestOrderByWithRelationInput[];
    cursor?: Prisma.PrePostTestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PrePostTestScalarFieldEnum | Prisma.PrePostTestScalarFieldEnum[];
};
export type PrePostTestFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrePostTestSelect<ExtArgs> | null;
    omit?: Prisma.PrePostTestOmit<ExtArgs> | null;
    include?: Prisma.PrePostTestInclude<ExtArgs> | null;
    where?: Prisma.PrePostTestWhereInput;
    orderBy?: Prisma.PrePostTestOrderByWithRelationInput | Prisma.PrePostTestOrderByWithRelationInput[];
    cursor?: Prisma.PrePostTestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PrePostTestScalarFieldEnum | Prisma.PrePostTestScalarFieldEnum[];
};
export type PrePostTestFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrePostTestSelect<ExtArgs> | null;
    omit?: Prisma.PrePostTestOmit<ExtArgs> | null;
    include?: Prisma.PrePostTestInclude<ExtArgs> | null;
    where?: Prisma.PrePostTestWhereInput;
    orderBy?: Prisma.PrePostTestOrderByWithRelationInput | Prisma.PrePostTestOrderByWithRelationInput[];
    cursor?: Prisma.PrePostTestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PrePostTestScalarFieldEnum | Prisma.PrePostTestScalarFieldEnum[];
};
export type PrePostTestCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrePostTestSelect<ExtArgs> | null;
    omit?: Prisma.PrePostTestOmit<ExtArgs> | null;
    include?: Prisma.PrePostTestInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PrePostTestCreateInput, Prisma.PrePostTestUncheckedCreateInput>;
};
export type PrePostTestCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PrePostTestCreateManyInput | Prisma.PrePostTestCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PrePostTestCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrePostTestSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PrePostTestOmit<ExtArgs> | null;
    data: Prisma.PrePostTestCreateManyInput | Prisma.PrePostTestCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PrePostTestIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PrePostTestUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrePostTestSelect<ExtArgs> | null;
    omit?: Prisma.PrePostTestOmit<ExtArgs> | null;
    include?: Prisma.PrePostTestInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PrePostTestUpdateInput, Prisma.PrePostTestUncheckedUpdateInput>;
    where: Prisma.PrePostTestWhereUniqueInput;
};
export type PrePostTestUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PrePostTestUpdateManyMutationInput, Prisma.PrePostTestUncheckedUpdateManyInput>;
    where?: Prisma.PrePostTestWhereInput;
    limit?: number;
};
export type PrePostTestUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrePostTestSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PrePostTestOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PrePostTestUpdateManyMutationInput, Prisma.PrePostTestUncheckedUpdateManyInput>;
    where?: Prisma.PrePostTestWhereInput;
    limit?: number;
    include?: Prisma.PrePostTestIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PrePostTestUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrePostTestSelect<ExtArgs> | null;
    omit?: Prisma.PrePostTestOmit<ExtArgs> | null;
    include?: Prisma.PrePostTestInclude<ExtArgs> | null;
    where: Prisma.PrePostTestWhereUniqueInput;
    create: Prisma.XOR<Prisma.PrePostTestCreateInput, Prisma.PrePostTestUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PrePostTestUpdateInput, Prisma.PrePostTestUncheckedUpdateInput>;
};
export type PrePostTestDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrePostTestSelect<ExtArgs> | null;
    omit?: Prisma.PrePostTestOmit<ExtArgs> | null;
    include?: Prisma.PrePostTestInclude<ExtArgs> | null;
    where: Prisma.PrePostTestWhereUniqueInput;
};
export type PrePostTestDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PrePostTestWhereInput;
    limit?: number;
};
export type PrePostTestDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrePostTestSelect<ExtArgs> | null;
    omit?: Prisma.PrePostTestOmit<ExtArgs> | null;
    include?: Prisma.PrePostTestInclude<ExtArgs> | null;
};
export {};
