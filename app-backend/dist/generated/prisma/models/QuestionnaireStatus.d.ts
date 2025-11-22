import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type QuestionnaireStatusModel = runtime.Types.Result.DefaultSelection<Prisma.$QuestionnaireStatusPayload>;
export type AggregateQuestionnaireStatus = {
    _count: QuestionnaireStatusCountAggregateOutputType | null;
    _min: QuestionnaireStatusMinAggregateOutputType | null;
    _max: QuestionnaireStatusMaxAggregateOutputType | null;
};
export type QuestionnaireStatusMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    type: $Enums.QuestionnaireType | null;
    status: $Enums.QuestionnaireStatusState | null;
    completedAt: Date | null;
    updatedAt: Date | null;
};
export type QuestionnaireStatusMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    type: $Enums.QuestionnaireType | null;
    status: $Enums.QuestionnaireStatusState | null;
    completedAt: Date | null;
    updatedAt: Date | null;
};
export type QuestionnaireStatusCountAggregateOutputType = {
    id: number;
    userId: number;
    type: number;
    status: number;
    completedAt: number;
    updatedAt: number;
    _all: number;
};
export type QuestionnaireStatusMinAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    status?: true;
    completedAt?: true;
    updatedAt?: true;
};
export type QuestionnaireStatusMaxAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    status?: true;
    completedAt?: true;
    updatedAt?: true;
};
export type QuestionnaireStatusCountAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    status?: true;
    completedAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type QuestionnaireStatusAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuestionnaireStatusWhereInput;
    orderBy?: Prisma.QuestionnaireStatusOrderByWithRelationInput | Prisma.QuestionnaireStatusOrderByWithRelationInput[];
    cursor?: Prisma.QuestionnaireStatusWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | QuestionnaireStatusCountAggregateInputType;
    _min?: QuestionnaireStatusMinAggregateInputType;
    _max?: QuestionnaireStatusMaxAggregateInputType;
};
export type GetQuestionnaireStatusAggregateType<T extends QuestionnaireStatusAggregateArgs> = {
    [P in keyof T & keyof AggregateQuestionnaireStatus]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateQuestionnaireStatus[P]> : Prisma.GetScalarType<T[P], AggregateQuestionnaireStatus[P]>;
};
export type QuestionnaireStatusGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuestionnaireStatusWhereInput;
    orderBy?: Prisma.QuestionnaireStatusOrderByWithAggregationInput | Prisma.QuestionnaireStatusOrderByWithAggregationInput[];
    by: Prisma.QuestionnaireStatusScalarFieldEnum[] | Prisma.QuestionnaireStatusScalarFieldEnum;
    having?: Prisma.QuestionnaireStatusScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: QuestionnaireStatusCountAggregateInputType | true;
    _min?: QuestionnaireStatusMinAggregateInputType;
    _max?: QuestionnaireStatusMaxAggregateInputType;
};
export type QuestionnaireStatusGroupByOutputType = {
    id: string;
    userId: string;
    type: $Enums.QuestionnaireType;
    status: $Enums.QuestionnaireStatusState;
    completedAt: Date | null;
    updatedAt: Date;
    _count: QuestionnaireStatusCountAggregateOutputType | null;
    _min: QuestionnaireStatusMinAggregateOutputType | null;
    _max: QuestionnaireStatusMaxAggregateOutputType | null;
};
type GetQuestionnaireStatusGroupByPayload<T extends QuestionnaireStatusGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<QuestionnaireStatusGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof QuestionnaireStatusGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], QuestionnaireStatusGroupByOutputType[P]> : Prisma.GetScalarType<T[P], QuestionnaireStatusGroupByOutputType[P]>;
}>>;
export type QuestionnaireStatusWhereInput = {
    AND?: Prisma.QuestionnaireStatusWhereInput | Prisma.QuestionnaireStatusWhereInput[];
    OR?: Prisma.QuestionnaireStatusWhereInput[];
    NOT?: Prisma.QuestionnaireStatusWhereInput | Prisma.QuestionnaireStatusWhereInput[];
    id?: Prisma.StringFilter<"QuestionnaireStatus"> | string;
    userId?: Prisma.StringFilter<"QuestionnaireStatus"> | string;
    type?: Prisma.EnumQuestionnaireTypeFilter<"QuestionnaireStatus"> | $Enums.QuestionnaireType;
    status?: Prisma.EnumQuestionnaireStatusStateFilter<"QuestionnaireStatus"> | $Enums.QuestionnaireStatusState;
    completedAt?: Prisma.DateTimeNullableFilter<"QuestionnaireStatus"> | Date | string | null;
    updatedAt?: Prisma.DateTimeFilter<"QuestionnaireStatus"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type QuestionnaireStatusOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type QuestionnaireStatusWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId_type?: Prisma.QuestionnaireStatusUserIdTypeCompoundUniqueInput;
    AND?: Prisma.QuestionnaireStatusWhereInput | Prisma.QuestionnaireStatusWhereInput[];
    OR?: Prisma.QuestionnaireStatusWhereInput[];
    NOT?: Prisma.QuestionnaireStatusWhereInput | Prisma.QuestionnaireStatusWhereInput[];
    userId?: Prisma.StringFilter<"QuestionnaireStatus"> | string;
    type?: Prisma.EnumQuestionnaireTypeFilter<"QuestionnaireStatus"> | $Enums.QuestionnaireType;
    status?: Prisma.EnumQuestionnaireStatusStateFilter<"QuestionnaireStatus"> | $Enums.QuestionnaireStatusState;
    completedAt?: Prisma.DateTimeNullableFilter<"QuestionnaireStatus"> | Date | string | null;
    updatedAt?: Prisma.DateTimeFilter<"QuestionnaireStatus"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "userId_type">;
export type QuestionnaireStatusOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.QuestionnaireStatusCountOrderByAggregateInput;
    _max?: Prisma.QuestionnaireStatusMaxOrderByAggregateInput;
    _min?: Prisma.QuestionnaireStatusMinOrderByAggregateInput;
};
export type QuestionnaireStatusScalarWhereWithAggregatesInput = {
    AND?: Prisma.QuestionnaireStatusScalarWhereWithAggregatesInput | Prisma.QuestionnaireStatusScalarWhereWithAggregatesInput[];
    OR?: Prisma.QuestionnaireStatusScalarWhereWithAggregatesInput[];
    NOT?: Prisma.QuestionnaireStatusScalarWhereWithAggregatesInput | Prisma.QuestionnaireStatusScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"QuestionnaireStatus"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"QuestionnaireStatus"> | string;
    type?: Prisma.EnumQuestionnaireTypeWithAggregatesFilter<"QuestionnaireStatus"> | $Enums.QuestionnaireType;
    status?: Prisma.EnumQuestionnaireStatusStateWithAggregatesFilter<"QuestionnaireStatus"> | $Enums.QuestionnaireStatusState;
    completedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"QuestionnaireStatus"> | Date | string | null;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"QuestionnaireStatus"> | Date | string;
};
export type QuestionnaireStatusCreateInput = {
    id?: string;
    type: $Enums.QuestionnaireType;
    status?: $Enums.QuestionnaireStatusState;
    completedAt?: Date | string | null;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutQuestionnaireStatusesInput;
};
export type QuestionnaireStatusUncheckedCreateInput = {
    id?: string;
    userId: string;
    type: $Enums.QuestionnaireType;
    status?: $Enums.QuestionnaireStatusState;
    completedAt?: Date | string | null;
    updatedAt?: Date | string;
};
export type QuestionnaireStatusUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumQuestionnaireTypeFieldUpdateOperationsInput | $Enums.QuestionnaireType;
    status?: Prisma.EnumQuestionnaireStatusStateFieldUpdateOperationsInput | $Enums.QuestionnaireStatusState;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutQuestionnaireStatusesNestedInput;
};
export type QuestionnaireStatusUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumQuestionnaireTypeFieldUpdateOperationsInput | $Enums.QuestionnaireType;
    status?: Prisma.EnumQuestionnaireStatusStateFieldUpdateOperationsInput | $Enums.QuestionnaireStatusState;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QuestionnaireStatusCreateManyInput = {
    id?: string;
    userId: string;
    type: $Enums.QuestionnaireType;
    status?: $Enums.QuestionnaireStatusState;
    completedAt?: Date | string | null;
    updatedAt?: Date | string;
};
export type QuestionnaireStatusUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumQuestionnaireTypeFieldUpdateOperationsInput | $Enums.QuestionnaireType;
    status?: Prisma.EnumQuestionnaireStatusStateFieldUpdateOperationsInput | $Enums.QuestionnaireStatusState;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QuestionnaireStatusUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumQuestionnaireTypeFieldUpdateOperationsInput | $Enums.QuestionnaireType;
    status?: Prisma.EnumQuestionnaireStatusStateFieldUpdateOperationsInput | $Enums.QuestionnaireStatusState;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QuestionnaireStatusListRelationFilter = {
    every?: Prisma.QuestionnaireStatusWhereInput;
    some?: Prisma.QuestionnaireStatusWhereInput;
    none?: Prisma.QuestionnaireStatusWhereInput;
};
export type QuestionnaireStatusOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type QuestionnaireStatusUserIdTypeCompoundUniqueInput = {
    userId: string;
    type: $Enums.QuestionnaireType;
};
export type QuestionnaireStatusCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type QuestionnaireStatusMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type QuestionnaireStatusMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type QuestionnaireStatusCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.QuestionnaireStatusCreateWithoutUserInput, Prisma.QuestionnaireStatusUncheckedCreateWithoutUserInput> | Prisma.QuestionnaireStatusCreateWithoutUserInput[] | Prisma.QuestionnaireStatusUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.QuestionnaireStatusCreateOrConnectWithoutUserInput | Prisma.QuestionnaireStatusCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.QuestionnaireStatusCreateManyUserInputEnvelope;
    connect?: Prisma.QuestionnaireStatusWhereUniqueInput | Prisma.QuestionnaireStatusWhereUniqueInput[];
};
export type QuestionnaireStatusUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.QuestionnaireStatusCreateWithoutUserInput, Prisma.QuestionnaireStatusUncheckedCreateWithoutUserInput> | Prisma.QuestionnaireStatusCreateWithoutUserInput[] | Prisma.QuestionnaireStatusUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.QuestionnaireStatusCreateOrConnectWithoutUserInput | Prisma.QuestionnaireStatusCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.QuestionnaireStatusCreateManyUserInputEnvelope;
    connect?: Prisma.QuestionnaireStatusWhereUniqueInput | Prisma.QuestionnaireStatusWhereUniqueInput[];
};
export type QuestionnaireStatusUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.QuestionnaireStatusCreateWithoutUserInput, Prisma.QuestionnaireStatusUncheckedCreateWithoutUserInput> | Prisma.QuestionnaireStatusCreateWithoutUserInput[] | Prisma.QuestionnaireStatusUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.QuestionnaireStatusCreateOrConnectWithoutUserInput | Prisma.QuestionnaireStatusCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.QuestionnaireStatusUpsertWithWhereUniqueWithoutUserInput | Prisma.QuestionnaireStatusUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.QuestionnaireStatusCreateManyUserInputEnvelope;
    set?: Prisma.QuestionnaireStatusWhereUniqueInput | Prisma.QuestionnaireStatusWhereUniqueInput[];
    disconnect?: Prisma.QuestionnaireStatusWhereUniqueInput | Prisma.QuestionnaireStatusWhereUniqueInput[];
    delete?: Prisma.QuestionnaireStatusWhereUniqueInput | Prisma.QuestionnaireStatusWhereUniqueInput[];
    connect?: Prisma.QuestionnaireStatusWhereUniqueInput | Prisma.QuestionnaireStatusWhereUniqueInput[];
    update?: Prisma.QuestionnaireStatusUpdateWithWhereUniqueWithoutUserInput | Prisma.QuestionnaireStatusUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.QuestionnaireStatusUpdateManyWithWhereWithoutUserInput | Prisma.QuestionnaireStatusUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.QuestionnaireStatusScalarWhereInput | Prisma.QuestionnaireStatusScalarWhereInput[];
};
export type QuestionnaireStatusUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.QuestionnaireStatusCreateWithoutUserInput, Prisma.QuestionnaireStatusUncheckedCreateWithoutUserInput> | Prisma.QuestionnaireStatusCreateWithoutUserInput[] | Prisma.QuestionnaireStatusUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.QuestionnaireStatusCreateOrConnectWithoutUserInput | Prisma.QuestionnaireStatusCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.QuestionnaireStatusUpsertWithWhereUniqueWithoutUserInput | Prisma.QuestionnaireStatusUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.QuestionnaireStatusCreateManyUserInputEnvelope;
    set?: Prisma.QuestionnaireStatusWhereUniqueInput | Prisma.QuestionnaireStatusWhereUniqueInput[];
    disconnect?: Prisma.QuestionnaireStatusWhereUniqueInput | Prisma.QuestionnaireStatusWhereUniqueInput[];
    delete?: Prisma.QuestionnaireStatusWhereUniqueInput | Prisma.QuestionnaireStatusWhereUniqueInput[];
    connect?: Prisma.QuestionnaireStatusWhereUniqueInput | Prisma.QuestionnaireStatusWhereUniqueInput[];
    update?: Prisma.QuestionnaireStatusUpdateWithWhereUniqueWithoutUserInput | Prisma.QuestionnaireStatusUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.QuestionnaireStatusUpdateManyWithWhereWithoutUserInput | Prisma.QuestionnaireStatusUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.QuestionnaireStatusScalarWhereInput | Prisma.QuestionnaireStatusScalarWhereInput[];
};
export type EnumQuestionnaireTypeFieldUpdateOperationsInput = {
    set?: $Enums.QuestionnaireType;
};
export type EnumQuestionnaireStatusStateFieldUpdateOperationsInput = {
    set?: $Enums.QuestionnaireStatusState;
};
export type QuestionnaireStatusCreateWithoutUserInput = {
    id?: string;
    type: $Enums.QuestionnaireType;
    status?: $Enums.QuestionnaireStatusState;
    completedAt?: Date | string | null;
    updatedAt?: Date | string;
};
export type QuestionnaireStatusUncheckedCreateWithoutUserInput = {
    id?: string;
    type: $Enums.QuestionnaireType;
    status?: $Enums.QuestionnaireStatusState;
    completedAt?: Date | string | null;
    updatedAt?: Date | string;
};
export type QuestionnaireStatusCreateOrConnectWithoutUserInput = {
    where: Prisma.QuestionnaireStatusWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuestionnaireStatusCreateWithoutUserInput, Prisma.QuestionnaireStatusUncheckedCreateWithoutUserInput>;
};
export type QuestionnaireStatusCreateManyUserInputEnvelope = {
    data: Prisma.QuestionnaireStatusCreateManyUserInput | Prisma.QuestionnaireStatusCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type QuestionnaireStatusUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.QuestionnaireStatusWhereUniqueInput;
    update: Prisma.XOR<Prisma.QuestionnaireStatusUpdateWithoutUserInput, Prisma.QuestionnaireStatusUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.QuestionnaireStatusCreateWithoutUserInput, Prisma.QuestionnaireStatusUncheckedCreateWithoutUserInput>;
};
export type QuestionnaireStatusUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.QuestionnaireStatusWhereUniqueInput;
    data: Prisma.XOR<Prisma.QuestionnaireStatusUpdateWithoutUserInput, Prisma.QuestionnaireStatusUncheckedUpdateWithoutUserInput>;
};
export type QuestionnaireStatusUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.QuestionnaireStatusScalarWhereInput;
    data: Prisma.XOR<Prisma.QuestionnaireStatusUpdateManyMutationInput, Prisma.QuestionnaireStatusUncheckedUpdateManyWithoutUserInput>;
};
export type QuestionnaireStatusScalarWhereInput = {
    AND?: Prisma.QuestionnaireStatusScalarWhereInput | Prisma.QuestionnaireStatusScalarWhereInput[];
    OR?: Prisma.QuestionnaireStatusScalarWhereInput[];
    NOT?: Prisma.QuestionnaireStatusScalarWhereInput | Prisma.QuestionnaireStatusScalarWhereInput[];
    id?: Prisma.StringFilter<"QuestionnaireStatus"> | string;
    userId?: Prisma.StringFilter<"QuestionnaireStatus"> | string;
    type?: Prisma.EnumQuestionnaireTypeFilter<"QuestionnaireStatus"> | $Enums.QuestionnaireType;
    status?: Prisma.EnumQuestionnaireStatusStateFilter<"QuestionnaireStatus"> | $Enums.QuestionnaireStatusState;
    completedAt?: Prisma.DateTimeNullableFilter<"QuestionnaireStatus"> | Date | string | null;
    updatedAt?: Prisma.DateTimeFilter<"QuestionnaireStatus"> | Date | string;
};
export type QuestionnaireStatusCreateManyUserInput = {
    id?: string;
    type: $Enums.QuestionnaireType;
    status?: $Enums.QuestionnaireStatusState;
    completedAt?: Date | string | null;
    updatedAt?: Date | string;
};
export type QuestionnaireStatusUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumQuestionnaireTypeFieldUpdateOperationsInput | $Enums.QuestionnaireType;
    status?: Prisma.EnumQuestionnaireStatusStateFieldUpdateOperationsInput | $Enums.QuestionnaireStatusState;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QuestionnaireStatusUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumQuestionnaireTypeFieldUpdateOperationsInput | $Enums.QuestionnaireType;
    status?: Prisma.EnumQuestionnaireStatusStateFieldUpdateOperationsInput | $Enums.QuestionnaireStatusState;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QuestionnaireStatusUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumQuestionnaireTypeFieldUpdateOperationsInput | $Enums.QuestionnaireType;
    status?: Prisma.EnumQuestionnaireStatusStateFieldUpdateOperationsInput | $Enums.QuestionnaireStatusState;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QuestionnaireStatusSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    status?: boolean;
    completedAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["questionnaireStatus"]>;
export type QuestionnaireStatusSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    status?: boolean;
    completedAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["questionnaireStatus"]>;
export type QuestionnaireStatusSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    status?: boolean;
    completedAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["questionnaireStatus"]>;
export type QuestionnaireStatusSelectScalar = {
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    status?: boolean;
    completedAt?: boolean;
    updatedAt?: boolean;
};
export type QuestionnaireStatusOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "type" | "status" | "completedAt" | "updatedAt", ExtArgs["result"]["questionnaireStatus"]>;
export type QuestionnaireStatusInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type QuestionnaireStatusIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type QuestionnaireStatusIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $QuestionnaireStatusPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "QuestionnaireStatus";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        type: $Enums.QuestionnaireType;
        status: $Enums.QuestionnaireStatusState;
        completedAt: Date | null;
        updatedAt: Date;
    }, ExtArgs["result"]["questionnaireStatus"]>;
    composites: {};
};
export type QuestionnaireStatusGetPayload<S extends boolean | null | undefined | QuestionnaireStatusDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$QuestionnaireStatusPayload, S>;
export type QuestionnaireStatusCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<QuestionnaireStatusFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: QuestionnaireStatusCountAggregateInputType | true;
};
export interface QuestionnaireStatusDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['QuestionnaireStatus'];
        meta: {
            name: 'QuestionnaireStatus';
        };
    };
    findUnique<T extends QuestionnaireStatusFindUniqueArgs>(args: Prisma.SelectSubset<T, QuestionnaireStatusFindUniqueArgs<ExtArgs>>): Prisma.Prisma__QuestionnaireStatusClient<runtime.Types.Result.GetResult<Prisma.$QuestionnaireStatusPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends QuestionnaireStatusFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, QuestionnaireStatusFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__QuestionnaireStatusClient<runtime.Types.Result.GetResult<Prisma.$QuestionnaireStatusPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends QuestionnaireStatusFindFirstArgs>(args?: Prisma.SelectSubset<T, QuestionnaireStatusFindFirstArgs<ExtArgs>>): Prisma.Prisma__QuestionnaireStatusClient<runtime.Types.Result.GetResult<Prisma.$QuestionnaireStatusPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends QuestionnaireStatusFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, QuestionnaireStatusFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__QuestionnaireStatusClient<runtime.Types.Result.GetResult<Prisma.$QuestionnaireStatusPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends QuestionnaireStatusFindManyArgs>(args?: Prisma.SelectSubset<T, QuestionnaireStatusFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuestionnaireStatusPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends QuestionnaireStatusCreateArgs>(args: Prisma.SelectSubset<T, QuestionnaireStatusCreateArgs<ExtArgs>>): Prisma.Prisma__QuestionnaireStatusClient<runtime.Types.Result.GetResult<Prisma.$QuestionnaireStatusPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends QuestionnaireStatusCreateManyArgs>(args?: Prisma.SelectSubset<T, QuestionnaireStatusCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends QuestionnaireStatusCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, QuestionnaireStatusCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuestionnaireStatusPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends QuestionnaireStatusDeleteArgs>(args: Prisma.SelectSubset<T, QuestionnaireStatusDeleteArgs<ExtArgs>>): Prisma.Prisma__QuestionnaireStatusClient<runtime.Types.Result.GetResult<Prisma.$QuestionnaireStatusPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends QuestionnaireStatusUpdateArgs>(args: Prisma.SelectSubset<T, QuestionnaireStatusUpdateArgs<ExtArgs>>): Prisma.Prisma__QuestionnaireStatusClient<runtime.Types.Result.GetResult<Prisma.$QuestionnaireStatusPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends QuestionnaireStatusDeleteManyArgs>(args?: Prisma.SelectSubset<T, QuestionnaireStatusDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends QuestionnaireStatusUpdateManyArgs>(args: Prisma.SelectSubset<T, QuestionnaireStatusUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends QuestionnaireStatusUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, QuestionnaireStatusUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuestionnaireStatusPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends QuestionnaireStatusUpsertArgs>(args: Prisma.SelectSubset<T, QuestionnaireStatusUpsertArgs<ExtArgs>>): Prisma.Prisma__QuestionnaireStatusClient<runtime.Types.Result.GetResult<Prisma.$QuestionnaireStatusPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends QuestionnaireStatusCountArgs>(args?: Prisma.Subset<T, QuestionnaireStatusCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], QuestionnaireStatusCountAggregateOutputType> : number>;
    aggregate<T extends QuestionnaireStatusAggregateArgs>(args: Prisma.Subset<T, QuestionnaireStatusAggregateArgs>): Prisma.PrismaPromise<GetQuestionnaireStatusAggregateType<T>>;
    groupBy<T extends QuestionnaireStatusGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: QuestionnaireStatusGroupByArgs['orderBy'];
    } : {
        orderBy?: QuestionnaireStatusGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, QuestionnaireStatusGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuestionnaireStatusGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: QuestionnaireStatusFieldRefs;
}
export interface Prisma__QuestionnaireStatusClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface QuestionnaireStatusFieldRefs {
    readonly id: Prisma.FieldRef<"QuestionnaireStatus", 'String'>;
    readonly userId: Prisma.FieldRef<"QuestionnaireStatus", 'String'>;
    readonly type: Prisma.FieldRef<"QuestionnaireStatus", 'QuestionnaireType'>;
    readonly status: Prisma.FieldRef<"QuestionnaireStatus", 'QuestionnaireStatusState'>;
    readonly completedAt: Prisma.FieldRef<"QuestionnaireStatus", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"QuestionnaireStatus", 'DateTime'>;
}
export type QuestionnaireStatusFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionnaireStatusSelect<ExtArgs> | null;
    omit?: Prisma.QuestionnaireStatusOmit<ExtArgs> | null;
    include?: Prisma.QuestionnaireStatusInclude<ExtArgs> | null;
    where: Prisma.QuestionnaireStatusWhereUniqueInput;
};
export type QuestionnaireStatusFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionnaireStatusSelect<ExtArgs> | null;
    omit?: Prisma.QuestionnaireStatusOmit<ExtArgs> | null;
    include?: Prisma.QuestionnaireStatusInclude<ExtArgs> | null;
    where: Prisma.QuestionnaireStatusWhereUniqueInput;
};
export type QuestionnaireStatusFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionnaireStatusSelect<ExtArgs> | null;
    omit?: Prisma.QuestionnaireStatusOmit<ExtArgs> | null;
    include?: Prisma.QuestionnaireStatusInclude<ExtArgs> | null;
    where?: Prisma.QuestionnaireStatusWhereInput;
    orderBy?: Prisma.QuestionnaireStatusOrderByWithRelationInput | Prisma.QuestionnaireStatusOrderByWithRelationInput[];
    cursor?: Prisma.QuestionnaireStatusWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuestionnaireStatusScalarFieldEnum | Prisma.QuestionnaireStatusScalarFieldEnum[];
};
export type QuestionnaireStatusFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionnaireStatusSelect<ExtArgs> | null;
    omit?: Prisma.QuestionnaireStatusOmit<ExtArgs> | null;
    include?: Prisma.QuestionnaireStatusInclude<ExtArgs> | null;
    where?: Prisma.QuestionnaireStatusWhereInput;
    orderBy?: Prisma.QuestionnaireStatusOrderByWithRelationInput | Prisma.QuestionnaireStatusOrderByWithRelationInput[];
    cursor?: Prisma.QuestionnaireStatusWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuestionnaireStatusScalarFieldEnum | Prisma.QuestionnaireStatusScalarFieldEnum[];
};
export type QuestionnaireStatusFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionnaireStatusSelect<ExtArgs> | null;
    omit?: Prisma.QuestionnaireStatusOmit<ExtArgs> | null;
    include?: Prisma.QuestionnaireStatusInclude<ExtArgs> | null;
    where?: Prisma.QuestionnaireStatusWhereInput;
    orderBy?: Prisma.QuestionnaireStatusOrderByWithRelationInput | Prisma.QuestionnaireStatusOrderByWithRelationInput[];
    cursor?: Prisma.QuestionnaireStatusWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuestionnaireStatusScalarFieldEnum | Prisma.QuestionnaireStatusScalarFieldEnum[];
};
export type QuestionnaireStatusCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionnaireStatusSelect<ExtArgs> | null;
    omit?: Prisma.QuestionnaireStatusOmit<ExtArgs> | null;
    include?: Prisma.QuestionnaireStatusInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QuestionnaireStatusCreateInput, Prisma.QuestionnaireStatusUncheckedCreateInput>;
};
export type QuestionnaireStatusCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.QuestionnaireStatusCreateManyInput | Prisma.QuestionnaireStatusCreateManyInput[];
    skipDuplicates?: boolean;
};
export type QuestionnaireStatusCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionnaireStatusSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.QuestionnaireStatusOmit<ExtArgs> | null;
    data: Prisma.QuestionnaireStatusCreateManyInput | Prisma.QuestionnaireStatusCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.QuestionnaireStatusIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type QuestionnaireStatusUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionnaireStatusSelect<ExtArgs> | null;
    omit?: Prisma.QuestionnaireStatusOmit<ExtArgs> | null;
    include?: Prisma.QuestionnaireStatusInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QuestionnaireStatusUpdateInput, Prisma.QuestionnaireStatusUncheckedUpdateInput>;
    where: Prisma.QuestionnaireStatusWhereUniqueInput;
};
export type QuestionnaireStatusUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.QuestionnaireStatusUpdateManyMutationInput, Prisma.QuestionnaireStatusUncheckedUpdateManyInput>;
    where?: Prisma.QuestionnaireStatusWhereInput;
    limit?: number;
};
export type QuestionnaireStatusUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionnaireStatusSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.QuestionnaireStatusOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QuestionnaireStatusUpdateManyMutationInput, Prisma.QuestionnaireStatusUncheckedUpdateManyInput>;
    where?: Prisma.QuestionnaireStatusWhereInput;
    limit?: number;
    include?: Prisma.QuestionnaireStatusIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type QuestionnaireStatusUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionnaireStatusSelect<ExtArgs> | null;
    omit?: Prisma.QuestionnaireStatusOmit<ExtArgs> | null;
    include?: Prisma.QuestionnaireStatusInclude<ExtArgs> | null;
    where: Prisma.QuestionnaireStatusWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuestionnaireStatusCreateInput, Prisma.QuestionnaireStatusUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.QuestionnaireStatusUpdateInput, Prisma.QuestionnaireStatusUncheckedUpdateInput>;
};
export type QuestionnaireStatusDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionnaireStatusSelect<ExtArgs> | null;
    omit?: Prisma.QuestionnaireStatusOmit<ExtArgs> | null;
    include?: Prisma.QuestionnaireStatusInclude<ExtArgs> | null;
    where: Prisma.QuestionnaireStatusWhereUniqueInput;
};
export type QuestionnaireStatusDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuestionnaireStatusWhereInput;
    limit?: number;
};
export type QuestionnaireStatusDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionnaireStatusSelect<ExtArgs> | null;
    omit?: Prisma.QuestionnaireStatusOmit<ExtArgs> | null;
    include?: Prisma.QuestionnaireStatusInclude<ExtArgs> | null;
};
export {};
