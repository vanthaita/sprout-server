/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('CANDIDATE', 'EMPLOYER', 'ADMIN');

-- CreateEnum
CREATE TYPE "GenderType" AS ENUM ('MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY');

-- CreateEnum
CREATE TYPE "CompanySizeType" AS ENUM ('1-10', '11-50', '51-200', '201-500', '501-1000', '1000+');

-- CreateEnum
CREATE TYPE "SalaryType" AS ENUM ('range', 'starting_from', 'up_to', 'negotiable');

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CLOSED', 'DRAFT');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('submitted', 'under_review', 'screening', 'interviewing', 'offer_made', 'offer_accepted', 'offer_rejected', 'rejected', 'withdrawn');

-- CreateEnum
CREATE TYPE "ProficiencyLevel" AS ENUM ('beginner', 'intermediate', 'advanced', 'expert', 'native');

-- CreateEnum
CREATE TYPE "JapaneseProficiencyLevel" AS ENUM ('N1', 'N2', 'N3', 'N4', 'N5', 'BUSINESS_LEVEL', 'DAILY_CONVERSATION', 'NATIVE', 'NONE');

-- CreateEnum
CREATE TYPE "JobTypeEnum" AS ENUM ('full_time', 'part_time', 'contract', 'temporary', 'internship', 'volunteer', 'freelance');

-- CreateEnum
CREATE TYPE "FileTypeEnum" AS ENUM ('pdf', 'doc', 'docx', 'image', 'other');

-- CreateEnum
CREATE TYPE "SkillCategory" AS ENUM ('PROFESSIONAL', 'TECHNICAL', 'LANGUAGE', 'SOFTWARE_TOOLS', 'INDUSTRY_SPECIFIC', 'SOFT_SKILL', 'CERTIFICATION', 'OTHER');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('COMPANY_OVERVIEW', 'JOB_DESCRIPTION', 'BENEFITS_INFO', 'PRESENTATION', 'VIDEO', 'OTHER');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('SLIDE', 'VIDEO', 'PORTFOLIO_ITEM', 'OTHER');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Industries" (
    "industry_id" SERIAL NOT NULL,
    "industry_name" VARCHAR(100) NOT NULL,
    "name_jp" VARCHAR(100),
    "description" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Industries_pkey" PRIMARY KEY ("industry_id")
);

-- CreateTable
CREATE TABLE "Skills" (
    "skill_id" SERIAL NOT NULL,
    "skill_name" VARCHAR(100) NOT NULL,
    "name_jp" VARCHAR(100),
    "category" "SkillCategory",
    "description" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Skills_pkey" PRIMARY KEY ("skill_id")
);

-- CreateTable
CREATE TABLE "Users" (
    "user_id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "full_name" VARCHAR(100) NOT NULL,
    "phone_number" VARCHAR(20),
    "user_type" "UserType" NOT NULL,
    "avatar_url" VARCHAR(255),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_email_verified" BOOLEAN NOT NULL DEFAULT false,
    "email_verify_token" VARCHAR(100),
    "password_reset_token" VARCHAR(100),
    "password_reset_expires" TIMESTAMP(6),
    "last_login" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Sessions" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip_address" TEXT,
    "user_agent" TEXT,

    CONSTRAINT "Sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employers" (
    "employer_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "company_name" VARCHAR(150) NOT NULL,
    "company_name_kana" VARCHAR(150),
    "company_name_jp" VARCHAR(150),
    "company_logo_url" VARCHAR(255),
    "company_website" VARCHAR(255),
    "company_description" TEXT,
    "company_description_jp" TEXT,
    "business_overview" TEXT,
    "business_overview_jp" TEXT,
    "company_address" TEXT,
    "company_address_jp" TEXT,
    "company_phone" VARCHAR(30),
    "establishment_date" DATE,
    "representative_name" VARCHAR(100),
    "representative_title" VARCHAR(100),
    "vietnam_branch_exists" BOOLEAN,
    "company_size" "CompanySizeType",
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Employers_pkey" PRIMARY KEY ("employer_id")
);

-- CreateTable
CREATE TABLE "Candidates" (
    "candidate_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name_kana" VARCHAR(100),
    "date_of_birth" DATE,
    "gender" "GenderType",
    "nationality" VARCHAR(100),
    "current_address_jp" TEXT,
    "home_country_address" TEXT,
    "country" VARCHAR(100),
    "headline" VARCHAR(255),
    "headline_jp" VARCHAR(255),
    "professional_summary" TEXT,
    "professional_summary_jp" TEXT,
    "appeal_statement" TEXT,
    "appeal_statement_jp" TEXT,
    "key_strengths" TEXT[],
    "motivation_statement" TEXT,
    "career_goals" TEXT,
    "linkedin_url" VARCHAR(255),
    "github_url" VARCHAR(255),
    "portfolio_url" VARCHAR(255),
    "other_social_profiles" JSONB,
    "desired_salary_min" DECIMAL(12,2),
    "desired_salary_max" DECIMAL(12,2),
    "desired_salary_type" "SalaryType",
    "preferred_job_types" "JobTypeEnum"[],
    "preferred_work_locations" TEXT[],
    "job_expectations" TEXT[],
    "interests_tags" TEXT[],
    "current_visa_status_jp" VARCHAR(100),
    "visa_expiry_date_jp" DATE,
    "desired_visa_support" BOOLEAN,
    "japanese_proficiency" "JapaneseProficiencyLevel",
    "english_proficiency" "ProficiencyLevel",
    "other_languages" JSONB,
    "willing_to_relocate_in_japan" BOOLEAN,
    "arrival_in_japan_date" DATE,
    "expected_graduation_date" DATE,
    "current_year_of_study" INTEGER,
    "student_id" VARCHAR(50),
    "is_searchable" BOOLEAN NOT NULL DEFAULT true,
    "profile_completeness" DOUBLE PRECISION,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Candidates_pkey" PRIMARY KEY ("candidate_id")
);

-- CreateTable
CREATE TABLE "Jobs" (
    "job_id" SERIAL NOT NULL,
    "employer_id" INTEGER NOT NULL,
    "industry_id" INTEGER,
    "title" VARCHAR(255) NOT NULL,
    "title_jp" VARCHAR(255),
    "description" TEXT NOT NULL,
    "description_jp" TEXT,
    "requirements" TEXT NOT NULL,
    "requirements_jp" TEXT,
    "benefits" TEXT,
    "benefits_jp" TEXT,
    "appeal_points" TEXT[],
    "salary_min" DECIMAL(12,2),
    "salary_max" DECIMAL(12,2),
    "salary_type" "SalaryType" NOT NULL DEFAULT 'range',
    "salary_details" TEXT,
    "country" VARCHAR(100) NOT NULL DEFAULT 'Japan',
    "prefecture" VARCHAR(100),
    "city" VARCHAR(100),
    "address_detail" TEXT,
    "nearest_station" VARCHAR(150),
    "is_remote" BOOLEAN NOT NULL DEFAULT false,
    "remote_details" TEXT,
    "job_type" "JobTypeEnum" NOT NULL,
    "status" "JobStatus" NOT NULL DEFAULT 'PENDING',
    "posted_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiry_date" TIMESTAMP(6),
    "external_application_url" VARCHAR(255),
    "hiring_stages" TEXT[],
    "working_hours_description" VARCHAR(255),
    "is_flex_time" BOOLEAN,
    "core_time_description" VARCHAR(100),
    "actual_working_hours_per_day" DECIMAL(4,2),
    "avg_overtime_hours_per_month" DECIMAL(5,1),
    "required_japanese_level" "JapaneseProficiencyLevel",
    "required_english_level" "ProficiencyLevel",
    "other_language_requirements" TEXT,
    "visa_support_available" BOOLEAN,
    "relocation_support_available" BOOLEAN,
    "housing_support_details" TEXT,
    "foreign_friendly_environment" BOOLEAN,
    "target_candidate_description" TEXT,
    "number_of_hires" INTEGER,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Jobs_pkey" PRIMARY KEY ("job_id")
);

-- CreateTable
CREATE TABLE "JobSkills" (
    "job_skill_id" SERIAL NOT NULL,
    "job_id" INTEGER NOT NULL,
    "skill_id" INTEGER NOT NULL,
    "importance_level" SMALLINT,
    "required_years" SMALLINT,

    CONSTRAINT "JobSkills_pkey" PRIMARY KEY ("job_skill_id")
);

-- CreateTable
CREATE TABLE "CandidateSkills" (
    "candidate_skill_id" SERIAL NOT NULL,
    "candidate_id" INTEGER NOT NULL,
    "skill_id" INTEGER NOT NULL,
    "proficiency_level" "ProficiencyLevel",
    "experience_months" SMALLINT,

    CONSTRAINT "CandidateSkills_pkey" PRIMARY KEY ("candidate_skill_id")
);

-- CreateTable
CREATE TABLE "CVs" (
    "cv_id" SERIAL NOT NULL,
    "candidate_id" INTEGER NOT NULL,
    "file_name" VARCHAR(255) NOT NULL,
    "file_url" VARCHAR(255) NOT NULL,
    "file_type" "FileTypeEnum",
    "language" VARCHAR(10),
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "uploaded_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CVs_pkey" PRIMARY KEY ("cv_id")
);

-- CreateTable
CREATE TABLE "Applications" (
    "application_id" SERIAL NOT NULL,
    "candidate_id" INTEGER NOT NULL,
    "job_id" INTEGER NOT NULL,
    "cv_id" INTEGER NOT NULL,
    "cover_letter" TEXT,
    "application_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'submitted',
    "status_message" TEXT,
    "current_stage_index" INTEGER,
    "internal_notes" TEXT,
    "candidate_notes" TEXT,
    "process_log" JSONB,
    "is_bookmarked" BOOLEAN DEFAULT false,
    "match_score" DECIMAL(5,2),
    "manual_score" DECIMAL(5,2),
    "offer_details" JSONB,
    "last_updated_by" INTEGER,

    CONSTRAINT "Applications_pkey" PRIMARY KEY ("application_id")
);

-- CreateTable
CREATE TABLE "Education" (
    "education_id" SERIAL NOT NULL,
    "candidate_id" INTEGER NOT NULL,
    "university_name" VARCHAR(255) NOT NULL,
    "faculty_department" VARCHAR(150),
    "degree" VARCHAR(100),
    "major" VARCHAR(100),
    "start_date" DATE,
    "end_date" DATE,
    "expected_graduation_date" DATE,
    "gpa" DECIMAL(3,2),
    "description" TEXT,
    "description_jp" TEXT,
    "country" VARCHAR(100),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("education_id")
);

-- CreateTable
CREATE TABLE "WorkExperience" (
    "experience_id" SERIAL NOT NULL,
    "candidate_id" INTEGER NOT NULL,
    "company_name" VARCHAR(150) NOT NULL,
    "job_title" VARCHAR(150) NOT NULL,
    "employment_type" "JobTypeEnum",
    "start_date" DATE NOT NULL,
    "end_date" DATE,
    "is_current" BOOLEAN NOT NULL DEFAULT false,
    "location" VARCHAR(150),
    "description" TEXT,
    "description_jp" TEXT,
    "responsibilities" TEXT[],
    "key_tools_technologies" TEXT[],
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "WorkExperience_pkey" PRIMARY KEY ("experience_id")
);

-- CreateTable
CREATE TABLE "Projects" (
    "project_id" SERIAL NOT NULL,
    "candidate_id" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "title_jp" VARCHAR(255),
    "url" VARCHAR(255),
    "purpose" TEXT,
    "purpose_jp" TEXT,
    "description" TEXT,
    "description_jp" TEXT,
    "bullet_points" TEXT[],
    "technologies_used" TEXT[],
    "team_details" VARCHAR(255),
    "duration" VARCHAR(50),
    "start_date" DATE,
    "end_date" DATE,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("project_id")
);

-- CreateTable
CREATE TABLE "Qualifications" (
    "qualification_id" SERIAL NOT NULL,
    "candidate_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "issuing_organization" VARCHAR(150),
    "issue_date" DATE,
    "expiry_date" DATE,
    "credential_id" VARCHAR(100),
    "credential_url" VARCHAR(255),
    "description" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Qualifications_pkey" PRIMARY KEY ("qualification_id")
);

-- CreateTable
CREATE TABLE "Awards" (
    "award_id" SERIAL NOT NULL,
    "candidate_id" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "issuer" VARCHAR(150),
    "date" DATE,
    "description" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Awards_pkey" PRIMARY KEY ("award_id")
);

-- CreateTable
CREATE TABLE "CandidateMedia" (
    "media_id" SERIAL NOT NULL,
    "candidate_id" INTEGER NOT NULL,
    "media_type" "MediaType" NOT NULL,
    "title" VARCHAR(255),
    "url" VARCHAR(255) NOT NULL,
    "thumbnail_url" VARCHAR(255),
    "description" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "CandidateMedia_pkey" PRIMARY KEY ("media_id")
);

-- CreateTable
CREATE TABLE "JobDocuments" (
    "job_document_id" SERIAL NOT NULL,
    "job_id" INTEGER NOT NULL,
    "document_name" VARCHAR(255) NOT NULL,
    "document_url" VARCHAR(255) NOT NULL,
    "document_type" "DocumentType" NOT NULL,
    "thumbnail_url" VARCHAR(255),
    "uploaded_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobDocuments_pkey" PRIMARY KEY ("job_document_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Industries_industry_name_key" ON "Industries"("industry_name");

-- CreateIndex
CREATE UNIQUE INDEX "Skills_skill_name_key" ON "Skills"("skill_name");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_phone_number_key" ON "Users"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_verify_token_key" ON "Users"("email_verify_token");

-- CreateIndex
CREATE UNIQUE INDEX "Users_password_reset_token_key" ON "Users"("password_reset_token");

-- CreateIndex
CREATE UNIQUE INDEX "Sessions_sessionToken_key" ON "Sessions"("sessionToken");

-- CreateIndex
CREATE INDEX "Sessions_user_id_idx" ON "Sessions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Employers_user_id_key" ON "Employers"("user_id");

-- CreateIndex
CREATE INDEX "idx_employers_company_name" ON "Employers"("company_name");

-- CreateIndex
CREATE UNIQUE INDEX "Candidates_user_id_key" ON "Candidates"("user_id");

-- CreateIndex
CREATE INDEX "idx_candidates_is_searchable" ON "Candidates"("is_searchable");

-- CreateIndex
CREATE INDEX "idx_jobs_employer" ON "Jobs"("employer_id");

-- CreateIndex
CREATE INDEX "idx_jobs_industry" ON "Jobs"("industry_id");

-- CreateIndex
CREATE INDEX "idx_jobs_status" ON "Jobs"("status");

-- CreateIndex
CREATE INDEX "idx_jobs_job_type" ON "Jobs"("job_type");

-- CreateIndex
CREATE INDEX "idx_jobs_prefecture" ON "Jobs"("prefecture");

-- CreateIndex
CREATE INDEX "idx_jobs_japanese_level" ON "Jobs"("required_japanese_level");

-- CreateIndex
CREATE UNIQUE INDEX "JobSkills_job_id_skill_id_key" ON "JobSkills"("job_id", "skill_id");

-- CreateIndex
CREATE INDEX "idx_candidateskills_skill_id" ON "CandidateSkills"("skill_id");

-- CreateIndex
CREATE UNIQUE INDEX "CandidateSkills_candidate_id_skill_id_key" ON "CandidateSkills"("candidate_id", "skill_id");

-- CreateIndex
CREATE INDEX "idx_cvs_candidate_id" ON "CVs"("candidate_id");

-- CreateIndex
CREATE INDEX "idx_applications_job" ON "Applications"("job_id");

-- CreateIndex
CREATE INDEX "idx_applications_candidate" ON "Applications"("candidate_id");

-- CreateIndex
CREATE INDEX "idx_applications_status" ON "Applications"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Applications_candidate_id_job_id_key" ON "Applications"("candidate_id", "job_id");

-- CreateIndex
CREATE INDEX "idx_education_candidate_id" ON "Education"("candidate_id");

-- CreateIndex
CREATE INDEX "idx_workexperience_candidate_id" ON "WorkExperience"("candidate_id");

-- CreateIndex
CREATE INDEX "idx_projects_candidate_id" ON "Projects"("candidate_id");

-- CreateIndex
CREATE INDEX "idx_qualifications_candidate_id" ON "Qualifications"("candidate_id");

-- CreateIndex
CREATE INDEX "idx_awards_candidate_id" ON "Awards"("candidate_id");

-- CreateIndex
CREATE INDEX "idx_candidatemedia_candidate_id" ON "CandidateMedia"("candidate_id");

-- CreateIndex
CREATE INDEX "idx_jobdocuments_job_id" ON "JobDocuments"("job_id");

-- AddForeignKey
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employers" ADD CONSTRAINT "Employers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidates" ADD CONSTRAINT "Candidates_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jobs" ADD CONSTRAINT "Jobs_employer_id_fkey" FOREIGN KEY ("employer_id") REFERENCES "Employers"("employer_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jobs" ADD CONSTRAINT "Jobs_industry_id_fkey" FOREIGN KEY ("industry_id") REFERENCES "Industries"("industry_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobSkills" ADD CONSTRAINT "JobSkills_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Jobs"("job_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobSkills" ADD CONSTRAINT "JobSkills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "Skills"("skill_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateSkills" ADD CONSTRAINT "CandidateSkills_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "Candidates"("candidate_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateSkills" ADD CONSTRAINT "CandidateSkills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "Skills"("skill_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CVs" ADD CONSTRAINT "CVs_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "Candidates"("candidate_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Applications" ADD CONSTRAINT "Applications_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "Candidates"("candidate_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Applications" ADD CONSTRAINT "Applications_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Jobs"("job_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Applications" ADD CONSTRAINT "Applications_cv_id_fkey" FOREIGN KEY ("cv_id") REFERENCES "CVs"("cv_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Applications" ADD CONSTRAINT "Applications_last_updated_by_fkey" FOREIGN KEY ("last_updated_by") REFERENCES "Users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "Candidates"("candidate_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkExperience" ADD CONSTRAINT "WorkExperience_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "Candidates"("candidate_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "Candidates"("candidate_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Qualifications" ADD CONSTRAINT "Qualifications_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "Candidates"("candidate_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Awards" ADD CONSTRAINT "Awards_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "Candidates"("candidate_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateMedia" ADD CONSTRAINT "CandidateMedia_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "Candidates"("candidate_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobDocuments" ADD CONSTRAINT "JobDocuments_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Jobs"("job_id") ON DELETE CASCADE ON UPDATE CASCADE;
