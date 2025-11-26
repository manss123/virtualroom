-- CreateEnum
CREATE TYPE "PrePostType" AS ENUM ('PRE', 'POST');

-- CreateEnum
CREATE TYPE "QuestionnaireType" AS ENUM ('PDPA_CONSENT', 'PRE_TEST', 'PRE_SURVEY', 'POST_TEST', 'POST_SURVEY');

-- CreateEnum
CREATE TYPE "QuestionnaireStatusState" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "sex" TEXT,
    "age" INTEGER,
    "school" TEXT,
    "grade" TEXT,
    "refreshTokenHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pdpaAccepted" BOOLEAN NOT NULL DEFAULT false,
    "pdpaAcceptedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthIdentity" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerUserId" TEXT,
    "email" TEXT,
    "passwordHash" TEXT,

    CONSTRAINT "AuthIdentity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrePostTest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "PrePostType" NOT NULL,
    "totalItems" INTEGER NOT NULL DEFAULT 17,
    "score" INTEGER NOT NULL,
    "takenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PrePostTest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SelfRegAssessment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "totalItems" INTEGER NOT NULL DEFAULT 46,
    "score" INTEGER NOT NULL,
    "takenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SelfRegAssessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomPlan" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roomKey" TEXT NOT NULL,
    "plannedDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoomPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomStudyLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roomKey" TEXT NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "durationSec" INTEGER,

    CONSTRAINT "RoomStudyLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionnaireStatus" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "QuestionnaireType" NOT NULL,
    "status" "QuestionnaireStatusState" NOT NULL DEFAULT 'NOT_STARTED',
    "completedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionnaireStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AuthIdentity_provider_providerUserId_key" ON "AuthIdentity"("provider", "providerUserId");

-- CreateIndex
CREATE UNIQUE INDEX "AuthIdentity_provider_email_key" ON "AuthIdentity"("provider", "email");

-- CreateIndex
CREATE INDEX "RoomPlan_userId_roomKey_idx" ON "RoomPlan"("userId", "roomKey");

-- CreateIndex
CREATE INDEX "RoomStudyLog_userId_roomKey_startAt_idx" ON "RoomStudyLog"("userId", "roomKey", "startAt");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionnaireStatus_userId_type_key" ON "QuestionnaireStatus"("userId", "type");

-- AddForeignKey
ALTER TABLE "AuthIdentity" ADD CONSTRAINT "AuthIdentity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrePostTest" ADD CONSTRAINT "PrePostTest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SelfRegAssessment" ADD CONSTRAINT "SelfRegAssessment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomPlan" ADD CONSTRAINT "RoomPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomStudyLog" ADD CONSTRAINT "RoomStudyLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionnaireStatus" ADD CONSTRAINT "QuestionnaireStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
