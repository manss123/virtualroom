import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace";
export type UserModel = runtime.Types.Result.DefaultSelection<Prisma.$UserPayload>;
export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _avg: UserAvgAggregateOutputType | null;
    _sum: UserSumAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type UserAvgAggregateOutputType = {
    age: number | null;
};
export type UserSumAggregateOutputType = {
    age: number | null;
};
export type UserMinAggregateOutputType = {
    id: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    sex: string | null;
    age: number | null;
    school: string | null;
    grade: string | null;
    refreshTokenHash: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    pdpaAccepted: boolean | null;
    pdpaAcceptedAt: Date | null;
};
export type UserMaxAggregateOutputType = {
    id: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    sex: string | null;
    age: number | null;
    school: string | null;
    grade: string | null;
    refreshTokenHash: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    pdpaAccepted: boolean | null;
    pdpaAcceptedAt: Date | null;
};
export type UserCountAggregateOutputType = {
    id: number;
    email: number;
    firstName: number;
    lastName: number;
    sex: number;
    age: number;
    school: number;
    grade: number;
    refreshTokenHash: number;
    createdAt: number;
    updatedAt: number;
    pdpaAccepted: number;
    pdpaAcceptedAt: number;
    _all: number;
};
export type UserAvgAggregateInputType = {
    age?: true;
};
export type UserSumAggregateInputType = {
    age?: true;
};
export type UserMinAggregateInputType = {
    id?: true;
    email?: true;
    firstName?: true;
    lastName?: true;
    sex?: true;
    age?: true;
    school?: true;
    grade?: true;
    refreshTokenHash?: true;
    createdAt?: true;
    updatedAt?: true;
    pdpaAccepted?: true;
    pdpaAcceptedAt?: true;
};
export type UserMaxAggregateInputType = {
    id?: true;
    email?: true;
    firstName?: true;
    lastName?: true;
    sex?: true;
    age?: true;
    school?: true;
    grade?: true;
    refreshTokenHash?: true;
    createdAt?: true;
    updatedAt?: true;
    pdpaAccepted?: true;
    pdpaAcceptedAt?: true;
};
export type UserCountAggregateInputType = {
    id?: true;
    email?: true;
    firstName?: true;
    lastName?: true;
    sex?: true;
    age?: true;
    school?: true;
    grade?: true;
    refreshTokenHash?: true;
    createdAt?: true;
    updatedAt?: true;
    pdpaAccepted?: true;
    pdpaAcceptedAt?: true;
    _all?: true;
};
export type UserAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UserCountAggregateInputType;
    _avg?: UserAvgAggregateInputType;
    _sum?: UserSumAggregateInputType;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUser[P]> : Prisma.GetScalarType<T[P], AggregateUser[P]>;
};
export type UserGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithAggregationInput | Prisma.UserOrderByWithAggregationInput[];
    by: Prisma.UserScalarFieldEnum[] | Prisma.UserScalarFieldEnum;
    having?: Prisma.UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _avg?: UserAvgAggregateInputType;
    _sum?: UserSumAggregateInputType;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type UserGroupByOutputType = {
    id: string;
    email: string | null;
    firstName: string;
    lastName: string;
    sex: string | null;
    age: number | null;
    school: string | null;
    grade: string | null;
    refreshTokenHash: string | null;
    createdAt: Date;
    updatedAt: Date;
    pdpaAccepted: boolean;
    pdpaAcceptedAt: Date | null;
    _count: UserCountAggregateOutputType | null;
    _avg: UserAvgAggregateOutputType | null;
    _sum: UserSumAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]>;
}>>;
export type UserWhereInput = {
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    id?: Prisma.StringFilter<"User"> | string;
    email?: Prisma.StringNullableFilter<"User"> | string | null;
    firstName?: Prisma.StringFilter<"User"> | string;
    lastName?: Prisma.StringFilter<"User"> | string;
    sex?: Prisma.StringNullableFilter<"User"> | string | null;
    age?: Prisma.IntNullableFilter<"User"> | number | null;
    school?: Prisma.StringNullableFilter<"User"> | string | null;
    grade?: Prisma.StringNullableFilter<"User"> | string | null;
    refreshTokenHash?: Prisma.StringNullableFilter<"User"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    pdpaAccepted?: Prisma.BoolFilter<"User"> | boolean;
    pdpaAcceptedAt?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    identities?: Prisma.AuthIdentityListRelationFilter;
    prePostTests?: Prisma.PrePostTestListRelationFilter;
    selfRegs?: Prisma.SelfRegAssessmentListRelationFilter;
    roomPlans?: Prisma.RoomPlanListRelationFilter;
    studyLogs?: Prisma.RoomStudyLogListRelationFilter;
    questionnaireStatuses?: Prisma.QuestionnaireStatusListRelationFilter;
};
export type UserOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrderInput | Prisma.SortOrder;
    firstName?: Prisma.SortOrder;
    lastName?: Prisma.SortOrder;
    sex?: Prisma.SortOrderInput | Prisma.SortOrder;
    age?: Prisma.SortOrderInput | Prisma.SortOrder;
    school?: Prisma.SortOrderInput | Prisma.SortOrder;
    grade?: Prisma.SortOrderInput | Prisma.SortOrder;
    refreshTokenHash?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    pdpaAccepted?: Prisma.SortOrder;
    pdpaAcceptedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    identities?: Prisma.AuthIdentityOrderByRelationAggregateInput;
    prePostTests?: Prisma.PrePostTestOrderByRelationAggregateInput;
    selfRegs?: Prisma.SelfRegAssessmentOrderByRelationAggregateInput;
    roomPlans?: Prisma.RoomPlanOrderByRelationAggregateInput;
    studyLogs?: Prisma.RoomStudyLogOrderByRelationAggregateInput;
    questionnaireStatuses?: Prisma.QuestionnaireStatusOrderByRelationAggregateInput;
};
export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    email?: string;
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    firstName?: Prisma.StringFilter<"User"> | string;
    lastName?: Prisma.StringFilter<"User"> | string;
    sex?: Prisma.StringNullableFilter<"User"> | string | null;
    age?: Prisma.IntNullableFilter<"User"> | number | null;
    school?: Prisma.StringNullableFilter<"User"> | string | null;
    grade?: Prisma.StringNullableFilter<"User"> | string | null;
    refreshTokenHash?: Prisma.StringNullableFilter<"User"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    pdpaAccepted?: Prisma.BoolFilter<"User"> | boolean;
    pdpaAcceptedAt?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    identities?: Prisma.AuthIdentityListRelationFilter;
    prePostTests?: Prisma.PrePostTestListRelationFilter;
    selfRegs?: Prisma.SelfRegAssessmentListRelationFilter;
    roomPlans?: Prisma.RoomPlanListRelationFilter;
    studyLogs?: Prisma.RoomStudyLogListRelationFilter;
    questionnaireStatuses?: Prisma.QuestionnaireStatusListRelationFilter;
}, "id" | "email">;
export type UserOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrderInput | Prisma.SortOrder;
    firstName?: Prisma.SortOrder;
    lastName?: Prisma.SortOrder;
    sex?: Prisma.SortOrderInput | Prisma.SortOrder;
    age?: Prisma.SortOrderInput | Prisma.SortOrder;
    school?: Prisma.SortOrderInput | Prisma.SortOrder;
    grade?: Prisma.SortOrderInput | Prisma.SortOrder;
    refreshTokenHash?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    pdpaAccepted?: Prisma.SortOrder;
    pdpaAcceptedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.UserCountOrderByAggregateInput;
    _avg?: Prisma.UserAvgOrderByAggregateInput;
    _max?: Prisma.UserMaxOrderByAggregateInput;
    _min?: Prisma.UserMinOrderByAggregateInput;
    _sum?: Prisma.UserSumOrderByAggregateInput;
};
export type UserScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"User"> | string;
    email?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    firstName?: Prisma.StringWithAggregatesFilter<"User"> | string;
    lastName?: Prisma.StringWithAggregatesFilter<"User"> | string;
    sex?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    age?: Prisma.IntNullableWithAggregatesFilter<"User"> | number | null;
    school?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    grade?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    refreshTokenHash?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
    pdpaAccepted?: Prisma.BoolWithAggregatesFilter<"User"> | boolean;
    pdpaAcceptedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null;
};
export type UserCreateInput = {
    id?: string;
    email?: string | null;
    firstName: string;
    lastName: string;
    sex?: string | null;
    age?: number | null;
    school?: string | null;
    grade?: string | null;
    refreshTokenHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pdpaAccepted?: boolean;
    pdpaAcceptedAt?: Date | string | null;
    identities?: Prisma.AuthIdentityCreateNestedManyWithoutUserInput;
    prePostTests?: Prisma.PrePostTestCreateNestedManyWithoutUserInput;
    selfRegs?: Prisma.SelfRegAssessmentCreateNestedManyWithoutUserInput;
    roomPlans?: Prisma.RoomPlanCreateNestedManyWithoutUserInput;
    studyLogs?: Prisma.RoomStudyLogCreateNestedManyWithoutUserInput;
    questionnaireStatuses?: Prisma.QuestionnaireStatusCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateInput = {
    id?: string;
    email?: string | null;
    firstName: string;
    lastName: string;
    sex?: string | null;
    age?: number | null;
    school?: string | null;
    grade?: string | null;
    refreshTokenHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pdpaAccepted?: boolean;
    pdpaAcceptedAt?: Date | string | null;
    identities?: Prisma.AuthIdentityUncheckedCreateNestedManyWithoutUserInput;
    prePostTests?: Prisma.PrePostTestUncheckedCreateNestedManyWithoutUserInput;
    selfRegs?: Prisma.SelfRegAssessmentUncheckedCreateNestedManyWithoutUserInput;
    roomPlans?: Prisma.RoomPlanUncheckedCreateNestedManyWithoutUserInput;
    studyLogs?: Prisma.RoomStudyLogUncheckedCreateNestedManyWithoutUserInput;
    questionnaireStatuses?: Prisma.QuestionnaireStatusUncheckedCreateNestedManyWithoutUserInput;
};
export type UserUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    sex?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    age?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    school?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    grade?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refreshTokenHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pdpaAccepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pdpaAcceptedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    identities?: Prisma.AuthIdentityUpdateManyWithoutUserNestedInput;
    prePostTests?: Prisma.PrePostTestUpdateManyWithoutUserNestedInput;
    selfRegs?: Prisma.SelfRegAssessmentUpdateManyWithoutUserNestedInput;
    roomPlans?: Prisma.RoomPlanUpdateManyWithoutUserNestedInput;
    studyLogs?: Prisma.RoomStudyLogUpdateManyWithoutUserNestedInput;
    questionnaireStatuses?: Prisma.QuestionnaireStatusUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    sex?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    age?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    school?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    grade?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refreshTokenHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pdpaAccepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pdpaAcceptedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    identities?: Prisma.AuthIdentityUncheckedUpdateManyWithoutUserNestedInput;
    prePostTests?: Prisma.PrePostTestUncheckedUpdateManyWithoutUserNestedInput;
    selfRegs?: Prisma.SelfRegAssessmentUncheckedUpdateManyWithoutUserNestedInput;
    roomPlans?: Prisma.RoomPlanUncheckedUpdateManyWithoutUserNestedInput;
    studyLogs?: Prisma.RoomStudyLogUncheckedUpdateManyWithoutUserNestedInput;
    questionnaireStatuses?: Prisma.QuestionnaireStatusUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateManyInput = {
    id?: string;
    email?: string | null;
    firstName: string;
    lastName: string;
    sex?: string | null;
    age?: number | null;
    school?: string | null;
    grade?: string | null;
    refreshTokenHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pdpaAccepted?: boolean;
    pdpaAcceptedAt?: Date | string | null;
};
export type UserUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    sex?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    age?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    school?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    grade?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refreshTokenHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pdpaAccepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pdpaAcceptedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type UserUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    sex?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    age?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    school?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    grade?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refreshTokenHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pdpaAccepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pdpaAcceptedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type UserCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    firstName?: Prisma.SortOrder;
    lastName?: Prisma.SortOrder;
    sex?: Prisma.SortOrder;
    age?: Prisma.SortOrder;
    school?: Prisma.SortOrder;
    grade?: Prisma.SortOrder;
    refreshTokenHash?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    pdpaAccepted?: Prisma.SortOrder;
    pdpaAcceptedAt?: Prisma.SortOrder;
};
export type UserAvgOrderByAggregateInput = {
    age?: Prisma.SortOrder;
};
export type UserMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    firstName?: Prisma.SortOrder;
    lastName?: Prisma.SortOrder;
    sex?: Prisma.SortOrder;
    age?: Prisma.SortOrder;
    school?: Prisma.SortOrder;
    grade?: Prisma.SortOrder;
    refreshTokenHash?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    pdpaAccepted?: Prisma.SortOrder;
    pdpaAcceptedAt?: Prisma.SortOrder;
};
export type UserMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    firstName?: Prisma.SortOrder;
    lastName?: Prisma.SortOrder;
    sex?: Prisma.SortOrder;
    age?: Prisma.SortOrder;
    school?: Prisma.SortOrder;
    grade?: Prisma.SortOrder;
    refreshTokenHash?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    pdpaAccepted?: Prisma.SortOrder;
    pdpaAcceptedAt?: Prisma.SortOrder;
};
export type UserSumOrderByAggregateInput = {
    age?: Prisma.SortOrder;
};
export type UserScalarRelationFilter = {
    is?: Prisma.UserWhereInput;
    isNot?: Prisma.UserWhereInput;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type UserCreateNestedOneWithoutIdentitiesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutIdentitiesInput, Prisma.UserUncheckedCreateWithoutIdentitiesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutIdentitiesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutIdentitiesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutIdentitiesInput, Prisma.UserUncheckedCreateWithoutIdentitiesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutIdentitiesInput;
    upsert?: Prisma.UserUpsertWithoutIdentitiesInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutIdentitiesInput, Prisma.UserUpdateWithoutIdentitiesInput>, Prisma.UserUncheckedUpdateWithoutIdentitiesInput>;
};
export type UserCreateNestedOneWithoutPrePostTestsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPrePostTestsInput, Prisma.UserUncheckedCreateWithoutPrePostTestsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPrePostTestsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutPrePostTestsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPrePostTestsInput, Prisma.UserUncheckedCreateWithoutPrePostTestsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPrePostTestsInput;
    upsert?: Prisma.UserUpsertWithoutPrePostTestsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutPrePostTestsInput, Prisma.UserUpdateWithoutPrePostTestsInput>, Prisma.UserUncheckedUpdateWithoutPrePostTestsInput>;
};
export type UserCreateNestedOneWithoutSelfRegsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSelfRegsInput, Prisma.UserUncheckedCreateWithoutSelfRegsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSelfRegsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutSelfRegsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSelfRegsInput, Prisma.UserUncheckedCreateWithoutSelfRegsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSelfRegsInput;
    upsert?: Prisma.UserUpsertWithoutSelfRegsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutSelfRegsInput, Prisma.UserUpdateWithoutSelfRegsInput>, Prisma.UserUncheckedUpdateWithoutSelfRegsInput>;
};
export type UserCreateNestedOneWithoutRoomPlansInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutRoomPlansInput, Prisma.UserUncheckedCreateWithoutRoomPlansInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutRoomPlansInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutRoomPlansNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutRoomPlansInput, Prisma.UserUncheckedCreateWithoutRoomPlansInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutRoomPlansInput;
    upsert?: Prisma.UserUpsertWithoutRoomPlansInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutRoomPlansInput, Prisma.UserUpdateWithoutRoomPlansInput>, Prisma.UserUncheckedUpdateWithoutRoomPlansInput>;
};
export type UserCreateNestedOneWithoutStudyLogsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutStudyLogsInput, Prisma.UserUncheckedCreateWithoutStudyLogsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutStudyLogsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutStudyLogsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutStudyLogsInput, Prisma.UserUncheckedCreateWithoutStudyLogsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutStudyLogsInput;
    upsert?: Prisma.UserUpsertWithoutStudyLogsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutStudyLogsInput, Prisma.UserUpdateWithoutStudyLogsInput>, Prisma.UserUncheckedUpdateWithoutStudyLogsInput>;
};
export type UserCreateNestedOneWithoutQuestionnaireStatusesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutQuestionnaireStatusesInput, Prisma.UserUncheckedCreateWithoutQuestionnaireStatusesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutQuestionnaireStatusesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutQuestionnaireStatusesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutQuestionnaireStatusesInput, Prisma.UserUncheckedCreateWithoutQuestionnaireStatusesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutQuestionnaireStatusesInput;
    upsert?: Prisma.UserUpsertWithoutQuestionnaireStatusesInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutQuestionnaireStatusesInput, Prisma.UserUpdateWithoutQuestionnaireStatusesInput>, Prisma.UserUncheckedUpdateWithoutQuestionnaireStatusesInput>;
};
export type UserCreateWithoutIdentitiesInput = {
    id?: string;
    email?: string | null;
    firstName: string;
    lastName: string;
    sex?: string | null;
    age?: number | null;
    school?: string | null;
    grade?: string | null;
    refreshTokenHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pdpaAccepted?: boolean;
    pdpaAcceptedAt?: Date | string | null;
    prePostTests?: Prisma.PrePostTestCreateNestedManyWithoutUserInput;
    selfRegs?: Prisma.SelfRegAssessmentCreateNestedManyWithoutUserInput;
    roomPlans?: Prisma.RoomPlanCreateNestedManyWithoutUserInput;
    studyLogs?: Prisma.RoomStudyLogCreateNestedManyWithoutUserInput;
    questionnaireStatuses?: Prisma.QuestionnaireStatusCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutIdentitiesInput = {
    id?: string;
    email?: string | null;
    firstName: string;
    lastName: string;
    sex?: string | null;
    age?: number | null;
    school?: string | null;
    grade?: string | null;
    refreshTokenHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pdpaAccepted?: boolean;
    pdpaAcceptedAt?: Date | string | null;
    prePostTests?: Prisma.PrePostTestUncheckedCreateNestedManyWithoutUserInput;
    selfRegs?: Prisma.SelfRegAssessmentUncheckedCreateNestedManyWithoutUserInput;
    roomPlans?: Prisma.RoomPlanUncheckedCreateNestedManyWithoutUserInput;
    studyLogs?: Prisma.RoomStudyLogUncheckedCreateNestedManyWithoutUserInput;
    questionnaireStatuses?: Prisma.QuestionnaireStatusUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutIdentitiesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutIdentitiesInput, Prisma.UserUncheckedCreateWithoutIdentitiesInput>;
};
export type UserUpsertWithoutIdentitiesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutIdentitiesInput, Prisma.UserUncheckedUpdateWithoutIdentitiesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutIdentitiesInput, Prisma.UserUncheckedCreateWithoutIdentitiesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutIdentitiesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutIdentitiesInput, Prisma.UserUncheckedUpdateWithoutIdentitiesInput>;
};
export type UserUpdateWithoutIdentitiesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    sex?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    age?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    school?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    grade?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refreshTokenHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pdpaAccepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pdpaAcceptedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    prePostTests?: Prisma.PrePostTestUpdateManyWithoutUserNestedInput;
    selfRegs?: Prisma.SelfRegAssessmentUpdateManyWithoutUserNestedInput;
    roomPlans?: Prisma.RoomPlanUpdateManyWithoutUserNestedInput;
    studyLogs?: Prisma.RoomStudyLogUpdateManyWithoutUserNestedInput;
    questionnaireStatuses?: Prisma.QuestionnaireStatusUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutIdentitiesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    sex?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    age?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    school?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    grade?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refreshTokenHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pdpaAccepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pdpaAcceptedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    prePostTests?: Prisma.PrePostTestUncheckedUpdateManyWithoutUserNestedInput;
    selfRegs?: Prisma.SelfRegAssessmentUncheckedUpdateManyWithoutUserNestedInput;
    roomPlans?: Prisma.RoomPlanUncheckedUpdateManyWithoutUserNestedInput;
    studyLogs?: Prisma.RoomStudyLogUncheckedUpdateManyWithoutUserNestedInput;
    questionnaireStatuses?: Prisma.QuestionnaireStatusUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutPrePostTestsInput = {
    id?: string;
    email?: string | null;
    firstName: string;
    lastName: string;
    sex?: string | null;
    age?: number | null;
    school?: string | null;
    grade?: string | null;
    refreshTokenHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pdpaAccepted?: boolean;
    pdpaAcceptedAt?: Date | string | null;
    identities?: Prisma.AuthIdentityCreateNestedManyWithoutUserInput;
    selfRegs?: Prisma.SelfRegAssessmentCreateNestedManyWithoutUserInput;
    roomPlans?: Prisma.RoomPlanCreateNestedManyWithoutUserInput;
    studyLogs?: Prisma.RoomStudyLogCreateNestedManyWithoutUserInput;
    questionnaireStatuses?: Prisma.QuestionnaireStatusCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutPrePostTestsInput = {
    id?: string;
    email?: string | null;
    firstName: string;
    lastName: string;
    sex?: string | null;
    age?: number | null;
    school?: string | null;
    grade?: string | null;
    refreshTokenHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pdpaAccepted?: boolean;
    pdpaAcceptedAt?: Date | string | null;
    identities?: Prisma.AuthIdentityUncheckedCreateNestedManyWithoutUserInput;
    selfRegs?: Prisma.SelfRegAssessmentUncheckedCreateNestedManyWithoutUserInput;
    roomPlans?: Prisma.RoomPlanUncheckedCreateNestedManyWithoutUserInput;
    studyLogs?: Prisma.RoomStudyLogUncheckedCreateNestedManyWithoutUserInput;
    questionnaireStatuses?: Prisma.QuestionnaireStatusUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutPrePostTestsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutPrePostTestsInput, Prisma.UserUncheckedCreateWithoutPrePostTestsInput>;
};
export type UserUpsertWithoutPrePostTestsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutPrePostTestsInput, Prisma.UserUncheckedUpdateWithoutPrePostTestsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutPrePostTestsInput, Prisma.UserUncheckedCreateWithoutPrePostTestsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutPrePostTestsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutPrePostTestsInput, Prisma.UserUncheckedUpdateWithoutPrePostTestsInput>;
};
export type UserUpdateWithoutPrePostTestsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    sex?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    age?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    school?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    grade?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refreshTokenHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pdpaAccepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pdpaAcceptedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    identities?: Prisma.AuthIdentityUpdateManyWithoutUserNestedInput;
    selfRegs?: Prisma.SelfRegAssessmentUpdateManyWithoutUserNestedInput;
    roomPlans?: Prisma.RoomPlanUpdateManyWithoutUserNestedInput;
    studyLogs?: Prisma.RoomStudyLogUpdateManyWithoutUserNestedInput;
    questionnaireStatuses?: Prisma.QuestionnaireStatusUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutPrePostTestsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    sex?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    age?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    school?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    grade?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refreshTokenHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pdpaAccepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pdpaAcceptedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    identities?: Prisma.AuthIdentityUncheckedUpdateManyWithoutUserNestedInput;
    selfRegs?: Prisma.SelfRegAssessmentUncheckedUpdateManyWithoutUserNestedInput;
    roomPlans?: Prisma.RoomPlanUncheckedUpdateManyWithoutUserNestedInput;
    studyLogs?: Prisma.RoomStudyLogUncheckedUpdateManyWithoutUserNestedInput;
    questionnaireStatuses?: Prisma.QuestionnaireStatusUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutSelfRegsInput = {
    id?: string;
    email?: string | null;
    firstName: string;
    lastName: string;
    sex?: string | null;
    age?: number | null;
    school?: string | null;
    grade?: string | null;
    refreshTokenHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pdpaAccepted?: boolean;
    pdpaAcceptedAt?: Date | string | null;
    identities?: Prisma.AuthIdentityCreateNestedManyWithoutUserInput;
    prePostTests?: Prisma.PrePostTestCreateNestedManyWithoutUserInput;
    roomPlans?: Prisma.RoomPlanCreateNestedManyWithoutUserInput;
    studyLogs?: Prisma.RoomStudyLogCreateNestedManyWithoutUserInput;
    questionnaireStatuses?: Prisma.QuestionnaireStatusCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutSelfRegsInput = {
    id?: string;
    email?: string | null;
    firstName: string;
    lastName: string;
    sex?: string | null;
    age?: number | null;
    school?: string | null;
    grade?: string | null;
    refreshTokenHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pdpaAccepted?: boolean;
    pdpaAcceptedAt?: Date | string | null;
    identities?: Prisma.AuthIdentityUncheckedCreateNestedManyWithoutUserInput;
    prePostTests?: Prisma.PrePostTestUncheckedCreateNestedManyWithoutUserInput;
    roomPlans?: Prisma.RoomPlanUncheckedCreateNestedManyWithoutUserInput;
    studyLogs?: Prisma.RoomStudyLogUncheckedCreateNestedManyWithoutUserInput;
    questionnaireStatuses?: Prisma.QuestionnaireStatusUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutSelfRegsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutSelfRegsInput, Prisma.UserUncheckedCreateWithoutSelfRegsInput>;
};
export type UserUpsertWithoutSelfRegsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutSelfRegsInput, Prisma.UserUncheckedUpdateWithoutSelfRegsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutSelfRegsInput, Prisma.UserUncheckedCreateWithoutSelfRegsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutSelfRegsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutSelfRegsInput, Prisma.UserUncheckedUpdateWithoutSelfRegsInput>;
};
export type UserUpdateWithoutSelfRegsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    sex?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    age?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    school?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    grade?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refreshTokenHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pdpaAccepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pdpaAcceptedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    identities?: Prisma.AuthIdentityUpdateManyWithoutUserNestedInput;
    prePostTests?: Prisma.PrePostTestUpdateManyWithoutUserNestedInput;
    roomPlans?: Prisma.RoomPlanUpdateManyWithoutUserNestedInput;
    studyLogs?: Prisma.RoomStudyLogUpdateManyWithoutUserNestedInput;
    questionnaireStatuses?: Prisma.QuestionnaireStatusUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutSelfRegsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    sex?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    age?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    school?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    grade?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refreshTokenHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pdpaAccepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pdpaAcceptedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    identities?: Prisma.AuthIdentityUncheckedUpdateManyWithoutUserNestedInput;
    prePostTests?: Prisma.PrePostTestUncheckedUpdateManyWithoutUserNestedInput;
    roomPlans?: Prisma.RoomPlanUncheckedUpdateManyWithoutUserNestedInput;
    studyLogs?: Prisma.RoomStudyLogUncheckedUpdateManyWithoutUserNestedInput;
    questionnaireStatuses?: Prisma.QuestionnaireStatusUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutRoomPlansInput = {
    id?: string;
    email?: string | null;
    firstName: string;
    lastName: string;
    sex?: string | null;
    age?: number | null;
    school?: string | null;
    grade?: string | null;
    refreshTokenHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pdpaAccepted?: boolean;
    pdpaAcceptedAt?: Date | string | null;
    identities?: Prisma.AuthIdentityCreateNestedManyWithoutUserInput;
    prePostTests?: Prisma.PrePostTestCreateNestedManyWithoutUserInput;
    selfRegs?: Prisma.SelfRegAssessmentCreateNestedManyWithoutUserInput;
    studyLogs?: Prisma.RoomStudyLogCreateNestedManyWithoutUserInput;
    questionnaireStatuses?: Prisma.QuestionnaireStatusCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutRoomPlansInput = {
    id?: string;
    email?: string | null;
    firstName: string;
    lastName: string;
    sex?: string | null;
    age?: number | null;
    school?: string | null;
    grade?: string | null;
    refreshTokenHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pdpaAccepted?: boolean;
    pdpaAcceptedAt?: Date | string | null;
    identities?: Prisma.AuthIdentityUncheckedCreateNestedManyWithoutUserInput;
    prePostTests?: Prisma.PrePostTestUncheckedCreateNestedManyWithoutUserInput;
    selfRegs?: Prisma.SelfRegAssessmentUncheckedCreateNestedManyWithoutUserInput;
    studyLogs?: Prisma.RoomStudyLogUncheckedCreateNestedManyWithoutUserInput;
    questionnaireStatuses?: Prisma.QuestionnaireStatusUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutRoomPlansInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutRoomPlansInput, Prisma.UserUncheckedCreateWithoutRoomPlansInput>;
};
export type UserUpsertWithoutRoomPlansInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutRoomPlansInput, Prisma.UserUncheckedUpdateWithoutRoomPlansInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutRoomPlansInput, Prisma.UserUncheckedCreateWithoutRoomPlansInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutRoomPlansInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutRoomPlansInput, Prisma.UserUncheckedUpdateWithoutRoomPlansInput>;
};
export type UserUpdateWithoutRoomPlansInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    sex?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    age?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    school?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    grade?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refreshTokenHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pdpaAccepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pdpaAcceptedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    identities?: Prisma.AuthIdentityUpdateManyWithoutUserNestedInput;
    prePostTests?: Prisma.PrePostTestUpdateManyWithoutUserNestedInput;
    selfRegs?: Prisma.SelfRegAssessmentUpdateManyWithoutUserNestedInput;
    studyLogs?: Prisma.RoomStudyLogUpdateManyWithoutUserNestedInput;
    questionnaireStatuses?: Prisma.QuestionnaireStatusUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutRoomPlansInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    sex?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    age?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    school?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    grade?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refreshTokenHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pdpaAccepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pdpaAcceptedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    identities?: Prisma.AuthIdentityUncheckedUpdateManyWithoutUserNestedInput;
    prePostTests?: Prisma.PrePostTestUncheckedUpdateManyWithoutUserNestedInput;
    selfRegs?: Prisma.SelfRegAssessmentUncheckedUpdateManyWithoutUserNestedInput;
    studyLogs?: Prisma.RoomStudyLogUncheckedUpdateManyWithoutUserNestedInput;
    questionnaireStatuses?: Prisma.QuestionnaireStatusUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutStudyLogsInput = {
    id?: string;
    email?: string | null;
    firstName: string;
    lastName: string;
    sex?: string | null;
    age?: number | null;
    school?: string | null;
    grade?: string | null;
    refreshTokenHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pdpaAccepted?: boolean;
    pdpaAcceptedAt?: Date | string | null;
    identities?: Prisma.AuthIdentityCreateNestedManyWithoutUserInput;
    prePostTests?: Prisma.PrePostTestCreateNestedManyWithoutUserInput;
    selfRegs?: Prisma.SelfRegAssessmentCreateNestedManyWithoutUserInput;
    roomPlans?: Prisma.RoomPlanCreateNestedManyWithoutUserInput;
    questionnaireStatuses?: Prisma.QuestionnaireStatusCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutStudyLogsInput = {
    id?: string;
    email?: string | null;
    firstName: string;
    lastName: string;
    sex?: string | null;
    age?: number | null;
    school?: string | null;
    grade?: string | null;
    refreshTokenHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pdpaAccepted?: boolean;
    pdpaAcceptedAt?: Date | string | null;
    identities?: Prisma.AuthIdentityUncheckedCreateNestedManyWithoutUserInput;
    prePostTests?: Prisma.PrePostTestUncheckedCreateNestedManyWithoutUserInput;
    selfRegs?: Prisma.SelfRegAssessmentUncheckedCreateNestedManyWithoutUserInput;
    roomPlans?: Prisma.RoomPlanUncheckedCreateNestedManyWithoutUserInput;
    questionnaireStatuses?: Prisma.QuestionnaireStatusUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutStudyLogsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutStudyLogsInput, Prisma.UserUncheckedCreateWithoutStudyLogsInput>;
};
export type UserUpsertWithoutStudyLogsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutStudyLogsInput, Prisma.UserUncheckedUpdateWithoutStudyLogsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutStudyLogsInput, Prisma.UserUncheckedCreateWithoutStudyLogsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutStudyLogsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutStudyLogsInput, Prisma.UserUncheckedUpdateWithoutStudyLogsInput>;
};
export type UserUpdateWithoutStudyLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    sex?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    age?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    school?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    grade?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refreshTokenHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pdpaAccepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pdpaAcceptedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    identities?: Prisma.AuthIdentityUpdateManyWithoutUserNestedInput;
    prePostTests?: Prisma.PrePostTestUpdateManyWithoutUserNestedInput;
    selfRegs?: Prisma.SelfRegAssessmentUpdateManyWithoutUserNestedInput;
    roomPlans?: Prisma.RoomPlanUpdateManyWithoutUserNestedInput;
    questionnaireStatuses?: Prisma.QuestionnaireStatusUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutStudyLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    sex?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    age?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    school?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    grade?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refreshTokenHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pdpaAccepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pdpaAcceptedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    identities?: Prisma.AuthIdentityUncheckedUpdateManyWithoutUserNestedInput;
    prePostTests?: Prisma.PrePostTestUncheckedUpdateManyWithoutUserNestedInput;
    selfRegs?: Prisma.SelfRegAssessmentUncheckedUpdateManyWithoutUserNestedInput;
    roomPlans?: Prisma.RoomPlanUncheckedUpdateManyWithoutUserNestedInput;
    questionnaireStatuses?: Prisma.QuestionnaireStatusUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutQuestionnaireStatusesInput = {
    id?: string;
    email?: string | null;
    firstName: string;
    lastName: string;
    sex?: string | null;
    age?: number | null;
    school?: string | null;
    grade?: string | null;
    refreshTokenHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pdpaAccepted?: boolean;
    pdpaAcceptedAt?: Date | string | null;
    identities?: Prisma.AuthIdentityCreateNestedManyWithoutUserInput;
    prePostTests?: Prisma.PrePostTestCreateNestedManyWithoutUserInput;
    selfRegs?: Prisma.SelfRegAssessmentCreateNestedManyWithoutUserInput;
    roomPlans?: Prisma.RoomPlanCreateNestedManyWithoutUserInput;
    studyLogs?: Prisma.RoomStudyLogCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutQuestionnaireStatusesInput = {
    id?: string;
    email?: string | null;
    firstName: string;
    lastName: string;
    sex?: string | null;
    age?: number | null;
    school?: string | null;
    grade?: string | null;
    refreshTokenHash?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pdpaAccepted?: boolean;
    pdpaAcceptedAt?: Date | string | null;
    identities?: Prisma.AuthIdentityUncheckedCreateNestedManyWithoutUserInput;
    prePostTests?: Prisma.PrePostTestUncheckedCreateNestedManyWithoutUserInput;
    selfRegs?: Prisma.SelfRegAssessmentUncheckedCreateNestedManyWithoutUserInput;
    roomPlans?: Prisma.RoomPlanUncheckedCreateNestedManyWithoutUserInput;
    studyLogs?: Prisma.RoomStudyLogUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutQuestionnaireStatusesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutQuestionnaireStatusesInput, Prisma.UserUncheckedCreateWithoutQuestionnaireStatusesInput>;
};
export type UserUpsertWithoutQuestionnaireStatusesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutQuestionnaireStatusesInput, Prisma.UserUncheckedUpdateWithoutQuestionnaireStatusesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutQuestionnaireStatusesInput, Prisma.UserUncheckedCreateWithoutQuestionnaireStatusesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutQuestionnaireStatusesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutQuestionnaireStatusesInput, Prisma.UserUncheckedUpdateWithoutQuestionnaireStatusesInput>;
};
export type UserUpdateWithoutQuestionnaireStatusesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    sex?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    age?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    school?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    grade?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refreshTokenHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pdpaAccepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pdpaAcceptedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    identities?: Prisma.AuthIdentityUpdateManyWithoutUserNestedInput;
    prePostTests?: Prisma.PrePostTestUpdateManyWithoutUserNestedInput;
    selfRegs?: Prisma.SelfRegAssessmentUpdateManyWithoutUserNestedInput;
    roomPlans?: Prisma.RoomPlanUpdateManyWithoutUserNestedInput;
    studyLogs?: Prisma.RoomStudyLogUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutQuestionnaireStatusesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    sex?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    age?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    school?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    grade?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refreshTokenHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pdpaAccepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pdpaAcceptedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    identities?: Prisma.AuthIdentityUncheckedUpdateManyWithoutUserNestedInput;
    prePostTests?: Prisma.PrePostTestUncheckedUpdateManyWithoutUserNestedInput;
    selfRegs?: Prisma.SelfRegAssessmentUncheckedUpdateManyWithoutUserNestedInput;
    roomPlans?: Prisma.RoomPlanUncheckedUpdateManyWithoutUserNestedInput;
    studyLogs?: Prisma.RoomStudyLogUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCountOutputType = {
    identities: number;
    prePostTests: number;
    selfRegs: number;
    roomPlans: number;
    studyLogs: number;
    questionnaireStatuses: number;
};
export type UserCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    identities?: boolean | UserCountOutputTypeCountIdentitiesArgs;
    prePostTests?: boolean | UserCountOutputTypeCountPrePostTestsArgs;
    selfRegs?: boolean | UserCountOutputTypeCountSelfRegsArgs;
    roomPlans?: boolean | UserCountOutputTypeCountRoomPlansArgs;
    studyLogs?: boolean | UserCountOutputTypeCountStudyLogsArgs;
    questionnaireStatuses?: boolean | UserCountOutputTypeCountQuestionnaireStatusesArgs;
};
export type UserCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserCountOutputTypeSelect<ExtArgs> | null;
};
export type UserCountOutputTypeCountIdentitiesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuthIdentityWhereInput;
};
export type UserCountOutputTypeCountPrePostTestsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PrePostTestWhereInput;
};
export type UserCountOutputTypeCountSelfRegsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SelfRegAssessmentWhereInput;
};
export type UserCountOutputTypeCountRoomPlansArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RoomPlanWhereInput;
};
export type UserCountOutputTypeCountStudyLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RoomStudyLogWhereInput;
};
export type UserCountOutputTypeCountQuestionnaireStatusesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuestionnaireStatusWhereInput;
};
export type UserSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    sex?: boolean;
    age?: boolean;
    school?: boolean;
    grade?: boolean;
    refreshTokenHash?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    pdpaAccepted?: boolean;
    pdpaAcceptedAt?: boolean;
    identities?: boolean | Prisma.User$identitiesArgs<ExtArgs>;
    prePostTests?: boolean | Prisma.User$prePostTestsArgs<ExtArgs>;
    selfRegs?: boolean | Prisma.User$selfRegsArgs<ExtArgs>;
    roomPlans?: boolean | Prisma.User$roomPlansArgs<ExtArgs>;
    studyLogs?: boolean | Prisma.User$studyLogsArgs<ExtArgs>;
    questionnaireStatuses?: boolean | Prisma.User$questionnaireStatusesArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    sex?: boolean;
    age?: boolean;
    school?: boolean;
    grade?: boolean;
    refreshTokenHash?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    pdpaAccepted?: boolean;
    pdpaAcceptedAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    sex?: boolean;
    age?: boolean;
    school?: boolean;
    grade?: boolean;
    refreshTokenHash?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    pdpaAccepted?: boolean;
    pdpaAcceptedAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectScalar = {
    id?: boolean;
    email?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    sex?: boolean;
    age?: boolean;
    school?: boolean;
    grade?: boolean;
    refreshTokenHash?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    pdpaAccepted?: boolean;
    pdpaAcceptedAt?: boolean;
};
export type UserOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "email" | "firstName" | "lastName" | "sex" | "age" | "school" | "grade" | "refreshTokenHash" | "createdAt" | "updatedAt" | "pdpaAccepted" | "pdpaAcceptedAt", ExtArgs["result"]["user"]>;
export type UserInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    identities?: boolean | Prisma.User$identitiesArgs<ExtArgs>;
    prePostTests?: boolean | Prisma.User$prePostTestsArgs<ExtArgs>;
    selfRegs?: boolean | Prisma.User$selfRegsArgs<ExtArgs>;
    roomPlans?: boolean | Prisma.User$roomPlansArgs<ExtArgs>;
    studyLogs?: boolean | Prisma.User$studyLogsArgs<ExtArgs>;
    questionnaireStatuses?: boolean | Prisma.User$questionnaireStatusesArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
};
export type UserIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type UserIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $UserPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "User";
    objects: {
        identities: Prisma.$AuthIdentityPayload<ExtArgs>[];
        prePostTests: Prisma.$PrePostTestPayload<ExtArgs>[];
        selfRegs: Prisma.$SelfRegAssessmentPayload<ExtArgs>[];
        roomPlans: Prisma.$RoomPlanPayload<ExtArgs>[];
        studyLogs: Prisma.$RoomStudyLogPayload<ExtArgs>[];
        questionnaireStatuses: Prisma.$QuestionnaireStatusPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        email: string | null;
        firstName: string;
        lastName: string;
        sex: string | null;
        age: number | null;
        school: string | null;
        grade: string | null;
        refreshTokenHash: string | null;
        createdAt: Date;
        updatedAt: Date;
        pdpaAccepted: boolean;
        pdpaAcceptedAt: Date | null;
    }, ExtArgs["result"]["user"]>;
    composites: {};
};
export type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserPayload, S>;
export type UserCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserCountAggregateInputType | true;
};
export interface UserDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['User'];
        meta: {
            name: 'User';
        };
    };
    findUnique<T extends UserFindUniqueArgs>(args: Prisma.SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends UserFindFirstArgs>(args?: Prisma.SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends UserFindManyArgs>(args?: Prisma.SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends UserCreateArgs>(args: Prisma.SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends UserCreateManyArgs>(args?: Prisma.SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends UserDeleteArgs>(args: Prisma.SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends UserUpdateArgs>(args: Prisma.SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends UserDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends UserUpdateManyArgs>(args: Prisma.SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends UserUpsertArgs>(args: Prisma.SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends UserCountArgs>(args?: Prisma.Subset<T, UserCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserCountAggregateOutputType> : number>;
    aggregate<T extends UserAggregateArgs>(args: Prisma.Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>;
    groupBy<T extends UserGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserGroupByArgs['orderBy'];
    } : {
        orderBy?: UserGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: UserFieldRefs;
}
export interface Prisma__UserClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    identities<T extends Prisma.User$identitiesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$identitiesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuthIdentityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    prePostTests<T extends Prisma.User$prePostTestsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$prePostTestsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PrePostTestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    selfRegs<T extends Prisma.User$selfRegsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$selfRegsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SelfRegAssessmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    roomPlans<T extends Prisma.User$roomPlansArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$roomPlansArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoomPlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    studyLogs<T extends Prisma.User$studyLogsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$studyLogsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoomStudyLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    questionnaireStatuses<T extends Prisma.User$questionnaireStatusesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$questionnaireStatusesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuestionnaireStatusPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface UserFieldRefs {
    readonly id: Prisma.FieldRef<"User", 'String'>;
    readonly email: Prisma.FieldRef<"User", 'String'>;
    readonly firstName: Prisma.FieldRef<"User", 'String'>;
    readonly lastName: Prisma.FieldRef<"User", 'String'>;
    readonly sex: Prisma.FieldRef<"User", 'String'>;
    readonly age: Prisma.FieldRef<"User", 'Int'>;
    readonly school: Prisma.FieldRef<"User", 'String'>;
    readonly grade: Prisma.FieldRef<"User", 'String'>;
    readonly refreshTokenHash: Prisma.FieldRef<"User", 'String'>;
    readonly createdAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly pdpaAccepted: Prisma.FieldRef<"User", 'Boolean'>;
    readonly pdpaAcceptedAt: Prisma.FieldRef<"User", 'DateTime'>;
}
export type UserFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
};
export type UserCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
    where: Prisma.UserWhereUniqueInput;
};
export type UserUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type UserUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type UserUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
};
export type UserDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type User$identitiesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type User$prePostTestsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type User$selfRegsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type User$roomPlansArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type User$studyLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type User$questionnaireStatusesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type UserDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
};
export {};
