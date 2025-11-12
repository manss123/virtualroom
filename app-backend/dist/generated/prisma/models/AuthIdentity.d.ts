import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace";
export type AuthIdentityModel = runtime.Types.Result.DefaultSelection<Prisma.$AuthIdentityPayload>;
export type AggregateAuthIdentity = {
    _count: AuthIdentityCountAggregateOutputType | null;
    _min: AuthIdentityMinAggregateOutputType | null;
    _max: AuthIdentityMaxAggregateOutputType | null;
};
export type AuthIdentityMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    provider: string | null;
    providerUserId: string | null;
    email: string | null;
    passwordHash: string | null;
};
export type AuthIdentityMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    provider: string | null;
    providerUserId: string | null;
    email: string | null;
    passwordHash: string | null;
};
export type AuthIdentityCountAggregateOutputType = {
    id: number;
    userId: number;
    provider: number;
    providerUserId: number;
    email: number;
    passwordHash: number;
    _all: number;
};
export type AuthIdentityMinAggregateInputType = {
    id?: true;
    userId?: true;
    provider?: true;
    providerUserId?: true;
    email?: true;
    passwordHash?: true;
};
export type AuthIdentityMaxAggregateInputType = {
    id?: true;
    userId?: true;
    provider?: true;
    providerUserId?: true;
    email?: true;
    passwordHash?: true;
};
export type AuthIdentityCountAggregateInputType = {
    id?: true;
    userId?: true;
    provider?: true;
    providerUserId?: true;
    email?: true;
    passwordHash?: true;
    _all?: true;
};
export type AuthIdentityAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuthIdentityWhereInput;
    orderBy?: Prisma.AuthIdentityOrderByWithRelationInput | Prisma.AuthIdentityOrderByWithRelationInput[];
    cursor?: Prisma.AuthIdentityWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AuthIdentityCountAggregateInputType;
    _min?: AuthIdentityMinAggregateInputType;
    _max?: AuthIdentityMaxAggregateInputType;
};
export type GetAuthIdentityAggregateType<T extends AuthIdentityAggregateArgs> = {
    [P in keyof T & keyof AggregateAuthIdentity]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAuthIdentity[P]> : Prisma.GetScalarType<T[P], AggregateAuthIdentity[P]>;
};
export type AuthIdentityGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuthIdentityWhereInput;
    orderBy?: Prisma.AuthIdentityOrderByWithAggregationInput | Prisma.AuthIdentityOrderByWithAggregationInput[];
    by: Prisma.AuthIdentityScalarFieldEnum[] | Prisma.AuthIdentityScalarFieldEnum;
    having?: Prisma.AuthIdentityScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AuthIdentityCountAggregateInputType | true;
    _min?: AuthIdentityMinAggregateInputType;
    _max?: AuthIdentityMaxAggregateInputType;
};
export type AuthIdentityGroupByOutputType = {
    id: string;
    userId: string;
    provider: string;
    providerUserId: string | null;
    email: string | null;
    passwordHash: string | null;
    _count: AuthIdentityCountAggregateOutputType | null;
    _min: AuthIdentityMinAggregateOutputType | null;
    _max: AuthIdentityMaxAggregateOutputType | null;
};
type GetAuthIdentityGroupByPayload<T extends AuthIdentityGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AuthIdentityGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AuthIdentityGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AuthIdentityGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AuthIdentityGroupByOutputType[P]>;
}>>;
export type AuthIdentityWhereInput = {
    AND?: Prisma.AuthIdentityWhereInput | Prisma.AuthIdentityWhereInput[];
    OR?: Prisma.AuthIdentityWhereInput[];
    NOT?: Prisma.AuthIdentityWhereInput | Prisma.AuthIdentityWhereInput[];
    id?: Prisma.StringFilter<"AuthIdentity"> | string;
    userId?: Prisma.StringFilter<"AuthIdentity"> | string;
    provider?: Prisma.StringFilter<"AuthIdentity"> | string;
    providerUserId?: Prisma.StringNullableFilter<"AuthIdentity"> | string | null;
    email?: Prisma.StringNullableFilter<"AuthIdentity"> | string | null;
    passwordHash?: Prisma.StringNullableFilter<"AuthIdentity"> | string | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type AuthIdentityOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    providerUserId?: Prisma.SortOrderInput | Prisma.SortOrder;
    email?: Prisma.SortOrderInput | Prisma.SortOrder;
    passwordHash?: Prisma.SortOrderInput | Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type AuthIdentityWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    provider_providerUserId?: Prisma.AuthIdentityProviderProviderUserIdCompoundUniqueInput;
    provider_email?: Prisma.AuthIdentityProviderEmailCompoundUniqueInput;
    AND?: Prisma.AuthIdentityWhereInput | Prisma.AuthIdentityWhereInput[];
    OR?: Prisma.AuthIdentityWhereInput[];
    NOT?: Prisma.AuthIdentityWhereInput | Prisma.AuthIdentityWhereInput[];
    userId?: Prisma.StringFilter<"AuthIdentity"> | string;
    provider?: Prisma.StringFilter<"AuthIdentity"> | string;
    providerUserId?: Prisma.StringNullableFilter<"AuthIdentity"> | string | null;
    email?: Prisma.StringNullableFilter<"AuthIdentity"> | string | null;
    passwordHash?: Prisma.StringNullableFilter<"AuthIdentity"> | string | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "provider_providerUserId" | "provider_email">;
export type AuthIdentityOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    providerUserId?: Prisma.SortOrderInput | Prisma.SortOrder;
    email?: Prisma.SortOrderInput | Prisma.SortOrder;
    passwordHash?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.AuthIdentityCountOrderByAggregateInput;
    _max?: Prisma.AuthIdentityMaxOrderByAggregateInput;
    _min?: Prisma.AuthIdentityMinOrderByAggregateInput;
};
export type AuthIdentityScalarWhereWithAggregatesInput = {
    AND?: Prisma.AuthIdentityScalarWhereWithAggregatesInput | Prisma.AuthIdentityScalarWhereWithAggregatesInput[];
    OR?: Prisma.AuthIdentityScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AuthIdentityScalarWhereWithAggregatesInput | Prisma.AuthIdentityScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"AuthIdentity"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"AuthIdentity"> | string;
    provider?: Prisma.StringWithAggregatesFilter<"AuthIdentity"> | string;
    providerUserId?: Prisma.StringNullableWithAggregatesFilter<"AuthIdentity"> | string | null;
    email?: Prisma.StringNullableWithAggregatesFilter<"AuthIdentity"> | string | null;
    passwordHash?: Prisma.StringNullableWithAggregatesFilter<"AuthIdentity"> | string | null;
};
export type AuthIdentityCreateInput = {
    id?: string;
    provider: string;
    providerUserId?: string | null;
    email?: string | null;
    passwordHash?: string | null;
    user: Prisma.UserCreateNestedOneWithoutIdentitiesInput;
};
export type AuthIdentityUncheckedCreateInput = {
    id?: string;
    userId: string;
    provider: string;
    providerUserId?: string | null;
    email?: string | null;
    passwordHash?: string | null;
};
export type AuthIdentityUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    providerUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutIdentitiesNestedInput;
};
export type AuthIdentityUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    providerUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type AuthIdentityCreateManyInput = {
    id?: string;
    userId: string;
    provider: string;
    providerUserId?: string | null;
    email?: string | null;
    passwordHash?: string | null;
};
export type AuthIdentityUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    providerUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type AuthIdentityUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    providerUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type AuthIdentityListRelationFilter = {
    every?: Prisma.AuthIdentityWhereInput;
    some?: Prisma.AuthIdentityWhereInput;
    none?: Prisma.AuthIdentityWhereInput;
};
export type AuthIdentityOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AuthIdentityProviderProviderUserIdCompoundUniqueInput = {
    provider: string;
    providerUserId: string;
};
export type AuthIdentityProviderEmailCompoundUniqueInput = {
    provider: string;
    email: string;
};
export type AuthIdentityCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    providerUserId?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
};
export type AuthIdentityMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    providerUserId?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
};
export type AuthIdentityMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    providerUserId?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
};
export type AuthIdentityCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.AuthIdentityCreateWithoutUserInput, Prisma.AuthIdentityUncheckedCreateWithoutUserInput> | Prisma.AuthIdentityCreateWithoutUserInput[] | Prisma.AuthIdentityUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AuthIdentityCreateOrConnectWithoutUserInput | Prisma.AuthIdentityCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.AuthIdentityCreateManyUserInputEnvelope;
    connect?: Prisma.AuthIdentityWhereUniqueInput | Prisma.AuthIdentityWhereUniqueInput[];
};
export type AuthIdentityUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.AuthIdentityCreateWithoutUserInput, Prisma.AuthIdentityUncheckedCreateWithoutUserInput> | Prisma.AuthIdentityCreateWithoutUserInput[] | Prisma.AuthIdentityUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AuthIdentityCreateOrConnectWithoutUserInput | Prisma.AuthIdentityCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.AuthIdentityCreateManyUserInputEnvelope;
    connect?: Prisma.AuthIdentityWhereUniqueInput | Prisma.AuthIdentityWhereUniqueInput[];
};
export type AuthIdentityUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.AuthIdentityCreateWithoutUserInput, Prisma.AuthIdentityUncheckedCreateWithoutUserInput> | Prisma.AuthIdentityCreateWithoutUserInput[] | Prisma.AuthIdentityUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AuthIdentityCreateOrConnectWithoutUserInput | Prisma.AuthIdentityCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.AuthIdentityUpsertWithWhereUniqueWithoutUserInput | Prisma.AuthIdentityUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.AuthIdentityCreateManyUserInputEnvelope;
    set?: Prisma.AuthIdentityWhereUniqueInput | Prisma.AuthIdentityWhereUniqueInput[];
    disconnect?: Prisma.AuthIdentityWhereUniqueInput | Prisma.AuthIdentityWhereUniqueInput[];
    delete?: Prisma.AuthIdentityWhereUniqueInput | Prisma.AuthIdentityWhereUniqueInput[];
    connect?: Prisma.AuthIdentityWhereUniqueInput | Prisma.AuthIdentityWhereUniqueInput[];
    update?: Prisma.AuthIdentityUpdateWithWhereUniqueWithoutUserInput | Prisma.AuthIdentityUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.AuthIdentityUpdateManyWithWhereWithoutUserInput | Prisma.AuthIdentityUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.AuthIdentityScalarWhereInput | Prisma.AuthIdentityScalarWhereInput[];
};
export type AuthIdentityUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.AuthIdentityCreateWithoutUserInput, Prisma.AuthIdentityUncheckedCreateWithoutUserInput> | Prisma.AuthIdentityCreateWithoutUserInput[] | Prisma.AuthIdentityUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AuthIdentityCreateOrConnectWithoutUserInput | Prisma.AuthIdentityCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.AuthIdentityUpsertWithWhereUniqueWithoutUserInput | Prisma.AuthIdentityUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.AuthIdentityCreateManyUserInputEnvelope;
    set?: Prisma.AuthIdentityWhereUniqueInput | Prisma.AuthIdentityWhereUniqueInput[];
    disconnect?: Prisma.AuthIdentityWhereUniqueInput | Prisma.AuthIdentityWhereUniqueInput[];
    delete?: Prisma.AuthIdentityWhereUniqueInput | Prisma.AuthIdentityWhereUniqueInput[];
    connect?: Prisma.AuthIdentityWhereUniqueInput | Prisma.AuthIdentityWhereUniqueInput[];
    update?: Prisma.AuthIdentityUpdateWithWhereUniqueWithoutUserInput | Prisma.AuthIdentityUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.AuthIdentityUpdateManyWithWhereWithoutUserInput | Prisma.AuthIdentityUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.AuthIdentityScalarWhereInput | Prisma.AuthIdentityScalarWhereInput[];
};
export type AuthIdentityCreateWithoutUserInput = {
    id?: string;
    provider: string;
    providerUserId?: string | null;
    email?: string | null;
    passwordHash?: string | null;
};
export type AuthIdentityUncheckedCreateWithoutUserInput = {
    id?: string;
    provider: string;
    providerUserId?: string | null;
    email?: string | null;
    passwordHash?: string | null;
};
export type AuthIdentityCreateOrConnectWithoutUserInput = {
    where: Prisma.AuthIdentityWhereUniqueInput;
    create: Prisma.XOR<Prisma.AuthIdentityCreateWithoutUserInput, Prisma.AuthIdentityUncheckedCreateWithoutUserInput>;
};
export type AuthIdentityCreateManyUserInputEnvelope = {
    data: Prisma.AuthIdentityCreateManyUserInput | Prisma.AuthIdentityCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type AuthIdentityUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.AuthIdentityWhereUniqueInput;
    update: Prisma.XOR<Prisma.AuthIdentityUpdateWithoutUserInput, Prisma.AuthIdentityUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.AuthIdentityCreateWithoutUserInput, Prisma.AuthIdentityUncheckedCreateWithoutUserInput>;
};
export type AuthIdentityUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.AuthIdentityWhereUniqueInput;
    data: Prisma.XOR<Prisma.AuthIdentityUpdateWithoutUserInput, Prisma.AuthIdentityUncheckedUpdateWithoutUserInput>;
};
export type AuthIdentityUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.AuthIdentityScalarWhereInput;
    data: Prisma.XOR<Prisma.AuthIdentityUpdateManyMutationInput, Prisma.AuthIdentityUncheckedUpdateManyWithoutUserInput>;
};
export type AuthIdentityScalarWhereInput = {
    AND?: Prisma.AuthIdentityScalarWhereInput | Prisma.AuthIdentityScalarWhereInput[];
    OR?: Prisma.AuthIdentityScalarWhereInput[];
    NOT?: Prisma.AuthIdentityScalarWhereInput | Prisma.AuthIdentityScalarWhereInput[];
    id?: Prisma.StringFilter<"AuthIdentity"> | string;
    userId?: Prisma.StringFilter<"AuthIdentity"> | string;
    provider?: Prisma.StringFilter<"AuthIdentity"> | string;
    providerUserId?: Prisma.StringNullableFilter<"AuthIdentity"> | string | null;
    email?: Prisma.StringNullableFilter<"AuthIdentity"> | string | null;
    passwordHash?: Prisma.StringNullableFilter<"AuthIdentity"> | string | null;
};
export type AuthIdentityCreateManyUserInput = {
    id?: string;
    provider: string;
    providerUserId?: string | null;
    email?: string | null;
    passwordHash?: string | null;
};
export type AuthIdentityUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    providerUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type AuthIdentityUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    providerUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type AuthIdentityUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    providerUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type AuthIdentitySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    provider?: boolean;
    providerUserId?: boolean;
    email?: boolean;
    passwordHash?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["authIdentity"]>;
export type AuthIdentitySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    provider?: boolean;
    providerUserId?: boolean;
    email?: boolean;
    passwordHash?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["authIdentity"]>;
export type AuthIdentitySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    provider?: boolean;
    providerUserId?: boolean;
    email?: boolean;
    passwordHash?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["authIdentity"]>;
export type AuthIdentitySelectScalar = {
    id?: boolean;
    userId?: boolean;
    provider?: boolean;
    providerUserId?: boolean;
    email?: boolean;
    passwordHash?: boolean;
};
export type AuthIdentityOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "provider" | "providerUserId" | "email" | "passwordHash", ExtArgs["result"]["authIdentity"]>;
export type AuthIdentityInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type AuthIdentityIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type AuthIdentityIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $AuthIdentityPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "AuthIdentity";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        provider: string;
        providerUserId: string | null;
        email: string | null;
        passwordHash: string | null;
    }, ExtArgs["result"]["authIdentity"]>;
    composites: {};
};
export type AuthIdentityGetPayload<S extends boolean | null | undefined | AuthIdentityDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AuthIdentityPayload, S>;
export type AuthIdentityCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AuthIdentityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AuthIdentityCountAggregateInputType | true;
};
export interface AuthIdentityDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['AuthIdentity'];
        meta: {
            name: 'AuthIdentity';
        };
    };
    findUnique<T extends AuthIdentityFindUniqueArgs>(args: Prisma.SelectSubset<T, AuthIdentityFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AuthIdentityClient<runtime.Types.Result.GetResult<Prisma.$AuthIdentityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AuthIdentityFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AuthIdentityFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AuthIdentityClient<runtime.Types.Result.GetResult<Prisma.$AuthIdentityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AuthIdentityFindFirstArgs>(args?: Prisma.SelectSubset<T, AuthIdentityFindFirstArgs<ExtArgs>>): Prisma.Prisma__AuthIdentityClient<runtime.Types.Result.GetResult<Prisma.$AuthIdentityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AuthIdentityFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AuthIdentityFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AuthIdentityClient<runtime.Types.Result.GetResult<Prisma.$AuthIdentityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AuthIdentityFindManyArgs>(args?: Prisma.SelectSubset<T, AuthIdentityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuthIdentityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AuthIdentityCreateArgs>(args: Prisma.SelectSubset<T, AuthIdentityCreateArgs<ExtArgs>>): Prisma.Prisma__AuthIdentityClient<runtime.Types.Result.GetResult<Prisma.$AuthIdentityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AuthIdentityCreateManyArgs>(args?: Prisma.SelectSubset<T, AuthIdentityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AuthIdentityCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AuthIdentityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuthIdentityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AuthIdentityDeleteArgs>(args: Prisma.SelectSubset<T, AuthIdentityDeleteArgs<ExtArgs>>): Prisma.Prisma__AuthIdentityClient<runtime.Types.Result.GetResult<Prisma.$AuthIdentityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AuthIdentityUpdateArgs>(args: Prisma.SelectSubset<T, AuthIdentityUpdateArgs<ExtArgs>>): Prisma.Prisma__AuthIdentityClient<runtime.Types.Result.GetResult<Prisma.$AuthIdentityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AuthIdentityDeleteManyArgs>(args?: Prisma.SelectSubset<T, AuthIdentityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AuthIdentityUpdateManyArgs>(args: Prisma.SelectSubset<T, AuthIdentityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AuthIdentityUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AuthIdentityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuthIdentityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AuthIdentityUpsertArgs>(args: Prisma.SelectSubset<T, AuthIdentityUpsertArgs<ExtArgs>>): Prisma.Prisma__AuthIdentityClient<runtime.Types.Result.GetResult<Prisma.$AuthIdentityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AuthIdentityCountArgs>(args?: Prisma.Subset<T, AuthIdentityCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AuthIdentityCountAggregateOutputType> : number>;
    aggregate<T extends AuthIdentityAggregateArgs>(args: Prisma.Subset<T, AuthIdentityAggregateArgs>): Prisma.PrismaPromise<GetAuthIdentityAggregateType<T>>;
    groupBy<T extends AuthIdentityGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AuthIdentityGroupByArgs['orderBy'];
    } : {
        orderBy?: AuthIdentityGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AuthIdentityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthIdentityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AuthIdentityFieldRefs;
}
export interface Prisma__AuthIdentityClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AuthIdentityFieldRefs {
    readonly id: Prisma.FieldRef<"AuthIdentity", 'String'>;
    readonly userId: Prisma.FieldRef<"AuthIdentity", 'String'>;
    readonly provider: Prisma.FieldRef<"AuthIdentity", 'String'>;
    readonly providerUserId: Prisma.FieldRef<"AuthIdentity", 'String'>;
    readonly email: Prisma.FieldRef<"AuthIdentity", 'String'>;
    readonly passwordHash: Prisma.FieldRef<"AuthIdentity", 'String'>;
}
export type AuthIdentityFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthIdentitySelect<ExtArgs> | null;
    omit?: Prisma.AuthIdentityOmit<ExtArgs> | null;
    include?: Prisma.AuthIdentityInclude<ExtArgs> | null;
    where: Prisma.AuthIdentityWhereUniqueInput;
};
export type AuthIdentityFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthIdentitySelect<ExtArgs> | null;
    omit?: Prisma.AuthIdentityOmit<ExtArgs> | null;
    include?: Prisma.AuthIdentityInclude<ExtArgs> | null;
    where: Prisma.AuthIdentityWhereUniqueInput;
};
export type AuthIdentityFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthIdentitySelect<ExtArgs> | null;
    omit?: Prisma.AuthIdentityOmit<ExtArgs> | null;
    include?: Prisma.AuthIdentityInclude<ExtArgs> | null;
    where?: Prisma.AuthIdentityWhereInput;
    orderBy?: Prisma.AuthIdentityOrderByWithRelationInput | Prisma.AuthIdentityOrderByWithRelationInput[];
    cursor?: Prisma.AuthIdentityWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AuthIdentityScalarFieldEnum | Prisma.AuthIdentityScalarFieldEnum[];
};
export type AuthIdentityFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthIdentitySelect<ExtArgs> | null;
    omit?: Prisma.AuthIdentityOmit<ExtArgs> | null;
    include?: Prisma.AuthIdentityInclude<ExtArgs> | null;
    where?: Prisma.AuthIdentityWhereInput;
    orderBy?: Prisma.AuthIdentityOrderByWithRelationInput | Prisma.AuthIdentityOrderByWithRelationInput[];
    cursor?: Prisma.AuthIdentityWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AuthIdentityScalarFieldEnum | Prisma.AuthIdentityScalarFieldEnum[];
};
export type AuthIdentityFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthIdentitySelect<ExtArgs> | null;
    omit?: Prisma.AuthIdentityOmit<ExtArgs> | null;
    include?: Prisma.AuthIdentityInclude<ExtArgs> | null;
    where?: Prisma.AuthIdentityWhereInput;
    orderBy?: Prisma.AuthIdentityOrderByWithRelationInput | Prisma.AuthIdentityOrderByWithRelationInput[];
    cursor?: Prisma.AuthIdentityWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AuthIdentityScalarFieldEnum | Prisma.AuthIdentityScalarFieldEnum[];
};
export type AuthIdentityCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthIdentitySelect<ExtArgs> | null;
    omit?: Prisma.AuthIdentityOmit<ExtArgs> | null;
    include?: Prisma.AuthIdentityInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AuthIdentityCreateInput, Prisma.AuthIdentityUncheckedCreateInput>;
};
export type AuthIdentityCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AuthIdentityCreateManyInput | Prisma.AuthIdentityCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AuthIdentityCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthIdentitySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AuthIdentityOmit<ExtArgs> | null;
    data: Prisma.AuthIdentityCreateManyInput | Prisma.AuthIdentityCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.AuthIdentityIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type AuthIdentityUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthIdentitySelect<ExtArgs> | null;
    omit?: Prisma.AuthIdentityOmit<ExtArgs> | null;
    include?: Prisma.AuthIdentityInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AuthIdentityUpdateInput, Prisma.AuthIdentityUncheckedUpdateInput>;
    where: Prisma.AuthIdentityWhereUniqueInput;
};
export type AuthIdentityUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AuthIdentityUpdateManyMutationInput, Prisma.AuthIdentityUncheckedUpdateManyInput>;
    where?: Prisma.AuthIdentityWhereInput;
    limit?: number;
};
export type AuthIdentityUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthIdentitySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AuthIdentityOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AuthIdentityUpdateManyMutationInput, Prisma.AuthIdentityUncheckedUpdateManyInput>;
    where?: Prisma.AuthIdentityWhereInput;
    limit?: number;
    include?: Prisma.AuthIdentityIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type AuthIdentityUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthIdentitySelect<ExtArgs> | null;
    omit?: Prisma.AuthIdentityOmit<ExtArgs> | null;
    include?: Prisma.AuthIdentityInclude<ExtArgs> | null;
    where: Prisma.AuthIdentityWhereUniqueInput;
    create: Prisma.XOR<Prisma.AuthIdentityCreateInput, Prisma.AuthIdentityUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AuthIdentityUpdateInput, Prisma.AuthIdentityUncheckedUpdateInput>;
};
export type AuthIdentityDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthIdentitySelect<ExtArgs> | null;
    omit?: Prisma.AuthIdentityOmit<ExtArgs> | null;
    include?: Prisma.AuthIdentityInclude<ExtArgs> | null;
    where: Prisma.AuthIdentityWhereUniqueInput;
};
export type AuthIdentityDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuthIdentityWhereInput;
    limit?: number;
};
export type AuthIdentityDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthIdentitySelect<ExtArgs> | null;
    omit?: Prisma.AuthIdentityOmit<ExtArgs> | null;
    include?: Prisma.AuthIdentityInclude<ExtArgs> | null;
};
export {};
