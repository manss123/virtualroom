-- AlterTable
ALTER TABLE "User" ADD COLUMN     "pdpaAccepted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pdpaAcceptedAt" TIMESTAMP(3);
