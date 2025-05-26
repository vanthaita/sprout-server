/*
  Warnings:

  - The values [SUBMITTED,UNDER_REVIEW,INTERVIEWING,OFFER_MADE,WITHDRAWN] on the enum `ApplicationStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `cvId` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `WorkExperience` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('PUBLIC', 'PRIVATE');

-- AlterEnum
BEGIN;
CREATE TYPE "ApplicationStatus_new" AS ENUM ('APPLICATION_SUBMITTED', 'DOCUMENT_SCREENING', 'FIRST_INTERVIEW', 'SECOND_INTERVIEW', 'OFFER_STAGE', 'REJECTED');
ALTER TABLE "Application" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Application" ALTER COLUMN "status" TYPE "ApplicationStatus_new" USING ("status"::text::"ApplicationStatus_new");
ALTER TYPE "ApplicationStatus" RENAME TO "ApplicationStatus_old";
ALTER TYPE "ApplicationStatus_new" RENAME TO "ApplicationStatus";
DROP TYPE "ApplicationStatus_old";
ALTER TABLE "Application" ALTER COLUMN "status" SET DEFAULT 'APPLICATION_SUBMITTED';
COMMIT;

-- AlterEnum
ALTER TYPE "UserType" ADD VALUE 'NONE';

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_cvId_fkey";

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "cvId",
ALTER COLUMN "status" SET DEFAULT 'APPLICATION_SUBMITTED';

-- AlterTable
ALTER TABLE "Education" ALTER COLUMN "startDate" DROP NOT NULL,
ALTER COLUMN "startDate" SET DATA TYPE TEXT,
ALTER COLUMN "endDate" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Employer" ADD COLUMN     "CompanyDesc" TEXT,
ADD COLUMN     "CompanyUrl" TEXT,
ADD COLUMN     "address" TEXT,
ADD COLUMN     "companySize" TEXT,
ADD COLUMN     "foundedYear" TEXT,
ADD COLUMN     "industry" TEXT;

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "benefits" TEXT[],
ADD COLUMN     "primaryTag" TEXT,
ADD COLUMN     "salaryCurrency" TEXT,
ADD COLUMN     "salaryMax" TEXT,
ADD COLUMN     "salaryMin" TEXT,
ADD COLUMN     "salaryPeriod" TEXT,
ADD COLUMN     "tags" TEXT,
ADD COLUMN     "visibility" "Visibility";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isOnboarded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "refesh_token" TEXT,
ALTER COLUMN "userType" SET DEFAULT 'NONE';

-- AlterTable
ALTER TABLE "WorkExperience" DROP COLUMN "description",
ADD COLUMN     "jobTitle" TEXT;

-- CreateTable
CREATE TABLE "Links" (
    "id" SERIAL NOT NULL,
    "linkedln" TEXT,
    "Github" TEXT,
    "Portfolio" TEXT,
    "otherLink" TEXT,

    CONSTRAINT "Links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interviews" (
    "id" SERIAL NOT NULL,
    "candidateId" INTEGER NOT NULL,
    "jobId" INTEGER NOT NULL,
    "employerId" INTEGER NOT NULL,
    "scheduledDate" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'SCHEDULED',
    "meetingLink" TEXT,
    "notes" TEXT,
    "feedback" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Interviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Interviews_candidateId_idx" ON "Interviews"("candidateId");

-- CreateIndex
CREATE INDEX "Interviews_jobId_idx" ON "Interviews"("jobId");

-- CreateIndex
CREATE INDEX "Interviews_employerId_idx" ON "Interviews"("employerId");

-- CreateIndex
CREATE INDEX "Interviews_scheduledDate_idx" ON "Interviews"("scheduledDate");

-- AddForeignKey
ALTER TABLE "Interviews" ADD CONSTRAINT "Interviews_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interviews" ADD CONSTRAINT "Interviews_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interviews" ADD CONSTRAINT "Interviews_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "Employer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
