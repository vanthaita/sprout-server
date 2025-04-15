
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.IndustryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  nameJp: 'nameJp',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SkillScalarFieldEnum = {
  id: 'id',
  name: 'name',
  nameJp: 'nameJp',
  category: 'category',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  passwordHash: 'passwordHash',
  fullName: 'fullName',
  phoneNumber: 'phoneNumber',
  userType: 'userType',
  avatarUrl: 'avatarUrl',
  isActive: 'isActive',
  isEmailVerified: 'isEmailVerified',
  emailVerifyToken: 'emailVerifyToken',
  passwordResetToken: 'passwordResetToken',
  passwordResetExpires: 'passwordResetExpires',
  lastLogin: 'lastLogin',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  sessionToken: 'sessionToken',
  userId: 'userId',
  expiresAt: 'expiresAt',
  createdAt: 'createdAt',
  ipAddress: 'ipAddress',
  userAgent: 'userAgent'
};

exports.Prisma.EmployerScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  companyName: 'companyName',
  companyNameKana: 'companyNameKana',
  companyNameJp: 'companyNameJp',
  companyLogoUrl: 'companyLogoUrl',
  companyWebsite: 'companyWebsite',
  companyDescription: 'companyDescription',
  companyDescriptionJp: 'companyDescriptionJp',
  businessOverview: 'businessOverview',
  businessOverviewJp: 'businessOverviewJp',
  companyAddress: 'companyAddress',
  companyAddressJp: 'companyAddressJp',
  companyPhone: 'companyPhone',
  establishmentDate: 'establishmentDate',
  representativeName: 'representativeName',
  representativeTitle: 'representativeTitle',
  vietnamBranchExists: 'vietnamBranchExists',
  companySize: 'companySize',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CandidateScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  nameKana: 'nameKana',
  dateOfBirth: 'dateOfBirth',
  gender: 'gender',
  nationality: 'nationality',
  currentAddressJp: 'currentAddressJp',
  homeCountryAddress: 'homeCountryAddress',
  country: 'country',
  headline: 'headline',
  headlineJp: 'headlineJp',
  professionalSummary: 'professionalSummary',
  professionalSummaryJp: 'professionalSummaryJp',
  appealStatement: 'appealStatement',
  appealStatementJp: 'appealStatementJp',
  keyStrengths: 'keyStrengths',
  motivationStatement: 'motivationStatement',
  careerGoals: 'careerGoals',
  linkedinUrl: 'linkedinUrl',
  githubUrl: 'githubUrl',
  portfolioUrl: 'portfolioUrl',
  otherSocialProfiles: 'otherSocialProfiles',
  desiredSalaryMin: 'desiredSalaryMin',
  desiredSalaryMax: 'desiredSalaryMax',
  desiredSalaryType: 'desiredSalaryType',
  preferredJobTypes: 'preferredJobTypes',
  preferredWorkLocations: 'preferredWorkLocations',
  jobExpectations: 'jobExpectations',
  interestsTags: 'interestsTags',
  currentVisaStatusJp: 'currentVisaStatusJp',
  visaExpiryDateJp: 'visaExpiryDateJp',
  desiredVisaSupport: 'desiredVisaSupport',
  japaneseProficiency: 'japaneseProficiency',
  englishProficiency: 'englishProficiency',
  otherLanguages: 'otherLanguages',
  willingToRelocateInJapan: 'willingToRelocateInJapan',
  arrivalInJapanDate: 'arrivalInJapanDate',
  expectedGraduationDate: 'expectedGraduationDate',
  currentYearOfStudy: 'currentYearOfStudy',
  studentId: 'studentId',
  isSearchable: 'isSearchable',
  profileCompleteness: 'profileCompleteness',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.JobScalarFieldEnum = {
  id: 'id',
  employerId: 'employerId',
  industryId: 'industryId',
  title: 'title',
  titleJp: 'titleJp',
  description: 'description',
  descriptionJp: 'descriptionJp',
  requirements: 'requirements',
  requirementsJp: 'requirementsJp',
  benefits: 'benefits',
  benefitsJp: 'benefitsJp',
  appealPoints: 'appealPoints',
  salaryMin: 'salaryMin',
  salaryMax: 'salaryMax',
  salaryType: 'salaryType',
  salaryDetails: 'salaryDetails',
  country: 'country',
  prefecture: 'prefecture',
  city: 'city',
  addressDetail: 'addressDetail',
  nearestStation: 'nearestStation',
  isRemote: 'isRemote',
  remoteDetails: 'remoteDetails',
  jobType: 'jobType',
  status: 'status',
  postedDate: 'postedDate',
  expiryDate: 'expiryDate',
  externalApplicationUrl: 'externalApplicationUrl',
  hiringStages: 'hiringStages',
  workingHoursDescription: 'workingHoursDescription',
  isFlexTime: 'isFlexTime',
  coreTimeDescription: 'coreTimeDescription',
  actualWorkingHoursPerDay: 'actualWorkingHoursPerDay',
  avgOvertimeHoursPerMonth: 'avgOvertimeHoursPerMonth',
  requiredJapaneseLevel: 'requiredJapaneseLevel',
  requiredEnglishLevel: 'requiredEnglishLevel',
  otherLanguageRequirements: 'otherLanguageRequirements',
  visaSupportAvailable: 'visaSupportAvailable',
  relocationSupportAvailable: 'relocationSupportAvailable',
  housingSupportDetails: 'housingSupportDetails',
  foreignFriendlyEnvironment: 'foreignFriendlyEnvironment',
  targetCandidateDescription: 'targetCandidateDescription',
  numberOfHires: 'numberOfHires',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.JobSkillScalarFieldEnum = {
  id: 'id',
  jobId: 'jobId',
  skillId: 'skillId',
  importanceLevel: 'importanceLevel',
  requiredYears: 'requiredYears'
};

exports.Prisma.CandidateSkillScalarFieldEnum = {
  id: 'id',
  candidateId: 'candidateId',
  skillId: 'skillId',
  proficiencyLevel: 'proficiencyLevel',
  experienceMonths: 'experienceMonths'
};

exports.Prisma.CVScalarFieldEnum = {
  id: 'id',
  candidateId: 'candidateId',
  fileName: 'fileName',
  fileUrl: 'fileUrl',
  fileType: 'fileType',
  language: 'language',
  isPrimary: 'isPrimary',
  uploadedAt: 'uploadedAt'
};

exports.Prisma.ApplicationScalarFieldEnum = {
  id: 'id',
  candidateId: 'candidateId',
  jobId: 'jobId',
  cvId: 'cvId',
  coverLetter: 'coverLetter',
  applicationDate: 'applicationDate',
  status: 'status',
  statusMessage: 'statusMessage',
  currentStageIndex: 'currentStageIndex',
  internalNotes: 'internalNotes',
  candidateNotes: 'candidateNotes',
  processLog: 'processLog',
  isBookmarked: 'isBookmarked',
  matchScore: 'matchScore',
  manualScore: 'manualScore',
  offerDetails: 'offerDetails',
  lastUpdatedById: 'lastUpdatedById'
};

exports.Prisma.EducationScalarFieldEnum = {
  id: 'id',
  candidateId: 'candidateId',
  universityName: 'universityName',
  facultyDepartment: 'facultyDepartment',
  degree: 'degree',
  major: 'major',
  startDate: 'startDate',
  endDate: 'endDate',
  expectedGraduationDate: 'expectedGraduationDate',
  gpa: 'gpa',
  description: 'description',
  descriptionJp: 'descriptionJp',
  country: 'country',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.WorkExperienceScalarFieldEnum = {
  id: 'id',
  candidateId: 'candidateId',
  companyName: 'companyName',
  jobTitle: 'jobTitle',
  employmentType: 'employmentType',
  startDate: 'startDate',
  endDate: 'endDate',
  isCurrent: 'isCurrent',
  location: 'location',
  description: 'description',
  descriptionJp: 'descriptionJp',
  responsibilities: 'responsibilities',
  keyToolsTechnologies: 'keyToolsTechnologies',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProjectScalarFieldEnum = {
  id: 'id',
  candidateId: 'candidateId',
  title: 'title',
  titleJp: 'titleJp',
  url: 'url',
  purpose: 'purpose',
  purposeJp: 'purposeJp',
  description: 'description',
  descriptionJp: 'descriptionJp',
  bulletPoints: 'bulletPoints',
  technologiesUsed: 'technologiesUsed',
  teamDetails: 'teamDetails',
  duration: 'duration',
  startDate: 'startDate',
  endDate: 'endDate',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.QualificationScalarFieldEnum = {
  id: 'id',
  candidateId: 'candidateId',
  name: 'name',
  issuingOrganization: 'issuingOrganization',
  issueDate: 'issueDate',
  expiryDate: 'expiryDate',
  credentialId: 'credentialId',
  credentialUrl: 'credentialUrl',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AwardScalarFieldEnum = {
  id: 'id',
  candidateId: 'candidateId',
  title: 'title',
  issuer: 'issuer',
  date: 'date',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CandidateMediaScalarFieldEnum = {
  id: 'id',
  candidateId: 'candidateId',
  mediaType: 'mediaType',
  title: 'title',
  url: 'url',
  thumbnailUrl: 'thumbnailUrl',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.JobDocumentScalarFieldEnum = {
  id: 'id',
  jobId: 'jobId',
  documentName: 'documentName',
  documentUrl: 'documentUrl',
  documentType: 'documentType',
  thumbnailUrl: 'thumbnailUrl',
  uploadedAt: 'uploadedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.SkillCategory = exports.$Enums.SkillCategory = {
  PROFESSIONAL: 'PROFESSIONAL',
  TECHNICAL: 'TECHNICAL',
  LANGUAGE: 'LANGUAGE',
  SOFTWARE_TOOLS: 'SOFTWARE_TOOLS',
  INDUSTRY_SPECIFIC: 'INDUSTRY_SPECIFIC',
  SOFT_SKILL: 'SOFT_SKILL',
  CERTIFICATION: 'CERTIFICATION',
  OTHER: 'OTHER'
};

exports.UserType = exports.$Enums.UserType = {
  CANDIDATE: 'CANDIDATE',
  EMPLOYER: 'EMPLOYER',
  ADMIN: 'ADMIN'
};

exports.CompanySizeType = exports.$Enums.CompanySizeType = {
  SIZE_1_10: 'SIZE_1_10',
  SIZE_11_50: 'SIZE_11_50',
  SIZE_51_200: 'SIZE_51_200',
  SIZE_201_500: 'SIZE_201_500',
  SIZE_501_1000: 'SIZE_501_1000',
  SIZE_1000_PLUS: 'SIZE_1000_PLUS'
};

exports.GenderType = exports.$Enums.GenderType = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER',
  PREFER_NOT_TO_SAY: 'PREFER_NOT_TO_SAY'
};

exports.SalaryType = exports.$Enums.SalaryType = {
  range: 'range',
  starting_from: 'starting_from',
  up_to: 'up_to',
  negotiable: 'negotiable'
};

exports.JapaneseProficiencyLevel = exports.$Enums.JapaneseProficiencyLevel = {
  N1: 'N1',
  N2: 'N2',
  N3: 'N3',
  N4: 'N4',
  N5: 'N5',
  BUSINESS_LEVEL: 'BUSINESS_LEVEL',
  DAILY_CONVERSATION: 'DAILY_CONVERSATION',
  NATIVE: 'NATIVE',
  NONE: 'NONE'
};

exports.ProficiencyLevel = exports.$Enums.ProficiencyLevel = {
  beginner: 'beginner',
  intermediate: 'intermediate',
  advanced: 'advanced',
  expert: 'expert',
  native: 'native'
};

exports.JobTypeEnum = exports.$Enums.JobTypeEnum = {
  full_time: 'full_time',
  part_time: 'part_time',
  contract: 'contract',
  temporary: 'temporary',
  internship: 'internship',
  volunteer: 'volunteer',
  freelance: 'freelance'
};

exports.JobStatus = exports.$Enums.JobStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  CLOSED: 'CLOSED',
  DRAFT: 'DRAFT'
};

exports.FileTypeEnum = exports.$Enums.FileTypeEnum = {
  pdf: 'pdf',
  doc: 'doc',
  docx: 'docx',
  image: 'image',
  other: 'other'
};

exports.ApplicationStatus = exports.$Enums.ApplicationStatus = {
  submitted: 'submitted',
  under_review: 'under_review',
  screening: 'screening',
  interviewing: 'interviewing',
  offer_made: 'offer_made',
  offer_accepted: 'offer_accepted',
  offer_rejected: 'offer_rejected',
  rejected: 'rejected',
  withdrawn: 'withdrawn'
};

exports.MediaType = exports.$Enums.MediaType = {
  SLIDE: 'SLIDE',
  VIDEO: 'VIDEO',
  PORTFOLIO_ITEM: 'PORTFOLIO_ITEM',
  OTHER: 'OTHER'
};

exports.DocumentType = exports.$Enums.DocumentType = {
  COMPANY_OVERVIEW: 'COMPANY_OVERVIEW',
  JOB_DESCRIPTION: 'JOB_DESCRIPTION',
  BENEFITS_INFO: 'BENEFITS_INFO',
  PRESENTATION: 'PRESENTATION',
  VIDEO: 'VIDEO',
  OTHER: 'OTHER'
};

exports.Prisma.ModelName = {
  Industry: 'Industry',
  Skill: 'Skill',
  User: 'User',
  Session: 'Session',
  Employer: 'Employer',
  Candidate: 'Candidate',
  Job: 'Job',
  JobSkill: 'JobSkill',
  CandidateSkill: 'CandidateSkill',
  CV: 'CV',
  Application: 'Application',
  Education: 'Education',
  WorkExperience: 'WorkExperience',
  Project: 'Project',
  Qualification: 'Qualification',
  Award: 'Award',
  CandidateMedia: 'CandidateMedia',
  JobDocument: 'JobDocument'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
