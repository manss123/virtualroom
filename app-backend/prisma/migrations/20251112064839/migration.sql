-- CreateEnum
CREATE TYPE "PrePostType" AS ENUM ('PRE', 'POST');

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
