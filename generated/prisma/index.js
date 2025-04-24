
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
  createParam,
} = require('./runtime/library.js')


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

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

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




  const path = require('path')

/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  passwordHash: 'passwordHash',
  fullName: 'fullName',
  userType: 'userType',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  avatar: 'avatar'
};

exports.Prisma.EmployerScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  companyName: 'companyName',
  companyNameJp: 'companyNameJp',
  companyLogoUrl: 'companyLogoUrl',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CandidateScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  fullNameKanji: 'fullNameKanji',
  fullNameKana: 'fullNameKana',
  dateOfBirth: 'dateOfBirth',
  gender: 'gender',
  currentAddressJp: 'currentAddressJp',
  phoneNumber: 'phoneNumber',
  email: 'email',
  profilePhotoUrl: 'profilePhotoUrl',
  motivation: 'motivation',
  selfPromotion: 'selfPromotion',
  hobbies: 'hobbies',
  candidateRequests: 'candidateRequests',
  preferredJobTypes: 'preferredJobTypes',
  japaneseProficiency: 'japaneseProficiency',
  otherLanguages: 'otherLanguages',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.EducationScalarFieldEnum = {
  id: 'id',
  candidateId: 'candidateId',
  startDate: 'startDate',
  endDate: 'endDate',
  schoolName: 'schoolName',
  faculty: 'faculty',
  department: 'department',
  degreeOrStatus: 'degreeOrStatus',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.WorkExperienceScalarFieldEnum = {
  id: 'id',
  candidateId: 'candidateId',
  startDate: 'startDate',
  endDate: 'endDate',
  isCurrent: 'isCurrent',
  companyName: 'companyName',
  department: 'department',
  jobTitle: 'jobTitle',
  description: 'description',
  employmentType: 'employmentType',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.QualificationScalarFieldEnum = {
  id: 'id',
  candidateId: 'candidateId',
  issueDate: 'issueDate',
  name: 'name',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.JobScalarFieldEnum = {
  id: 'id',
  employerId: 'employerId',
  title: 'title',
  titleJp: 'titleJp',
  description: 'description',
  requirements: 'requirements',
  salaryDetails: 'salaryDetails',
  workLocation: 'workLocation',
  workingHours: 'workingHours',
  jobType: 'jobType',
  requiredJapaneseLevel: 'requiredJapaneseLevel',
  status: 'status',
  postedDate: 'postedDate',
  expiryDate: 'expiryDate',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
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
  applicationDate: 'applicationDate',
  status: 'status',
  coverLetter: 'coverLetter',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
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
exports.UserType = exports.$Enums.UserType = {
  CANDIDATE: 'CANDIDATE',
  EMPLOYER: 'EMPLOYER',
  ADMIN: 'ADMIN'
};

exports.GenderType = exports.$Enums.GenderType = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER',
  PREFER_NOT_TO_SAY: 'PREFER_NOT_TO_SAY'
};

exports.JobTypeEnum = exports.$Enums.JobTypeEnum = {
  full_time: 'full_time',
  part_time: 'part_time',
  contract: 'contract',
  temporary: 'temporary',
  internship: 'internship',
  freelance: 'freelance'
};

exports.ProficiencyLevel = exports.$Enums.ProficiencyLevel = {
  beginner: 'beginner',
  intermediate: 'intermediate',
  advanced: 'advanced',
  expert: 'expert',
  native: 'native'
};

exports.JobStatus = exports.$Enums.JobStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  CLOSED: 'CLOSED',
  DRAFT: 'DRAFT'
};

exports.ApplicationStatus = exports.$Enums.ApplicationStatus = {
  submitted: 'submitted',
  under_review: 'under_review',
  interviewing: 'interviewing',
  offer_made: 'offer_made',
  rejected: 'rejected',
  withdrawn: 'withdrawn'
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

exports.FileTypeEnum = exports.$Enums.FileTypeEnum = {
  pdf: 'pdf',
  doc: 'doc',
  docx: 'docx',
  other: 'other'
};

exports.Prisma.ModelName = {
  User: 'User',
  Employer: 'Employer',
  Candidate: 'Candidate',
  Education: 'Education',
  WorkExperience: 'WorkExperience',
  Qualification: 'Qualification',
  Job: 'Job',
  CV: 'CV',
  Application: 'Application'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "D:\\Projects\\clone\\sprout-server\\generated\\prisma",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "D:\\Projects\\clone\\sprout-server\\prisma\\schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../.env"
  },
  "relativePath": "../../prisma",
  "clientVersion": "6.6.0",
  "engineVersion": "f676762280b54cd07c770017ed3711ddde35f37a",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\ngenerator client {\n  provider = \"prisma-client-js\"\n  output   = \"../generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\n// --- Enums (Kept relevant ones + ProficiencyLevel) ---\n\nenum UserType {\n  CANDIDATE\n  EMPLOYER\n  ADMIN\n}\n\nenum GenderType {\n  MALE\n  FEMALE\n  OTHER\n  PREFER_NOT_TO_SAY\n}\n\n/// Loại hình công việc (Toàn thời gian, Bán thời gian, v.v.)\nenum JobTypeEnum {\n  full_time // 正社員 (Nhân viên chính thức)\n  part_time // アルバイト・パート (Làm thêm)\n  contract // 契約社員 (Nhân viên hợp đồng)\n  temporary // 派遣社員 (Nhân viên phái cử)\n  internship // インターンシップ (Thực tập)\n  freelance // 業務委託 (Ủy thác nghiệp vụ / Freelance)\n}\n\n/// Mức độ thành thạo kỹ năng/ngôn ngữ\nenum ProficiencyLevel {\n  beginner // Sơ cấp / Mới bắt đầu\n  intermediate // Trung cấp / Có kinh nghiệm\n  advanced // Cao cấp / Thành thạo\n  expert // Chuyên gia / Rất thành thạo\n  native // Bản xứ (cho ngôn ngữ)\n}\n\n/// Trạng thái công việc\nenum JobStatus {\n  PENDING\n  APPROVED\n  REJECTED\n  CLOSED\n  DRAFT\n}\n\n/// Trạng thái ứng tuyển\nenum ApplicationStatus {\n  submitted // Nộp\n  under_review // Đang xem xét\n  interviewing // Phỏng vấn\n  offer_made // Đã gửi offer\n  rejected // Bị từ chối\n  withdrawn // Rút lui\n}\n\n/// Trình độ tiếng Nhật (JLPT hoặc tương đương)\nenum JapaneseProficiencyLevel {\n  N1\n  N2\n  N3\n  N4\n  N5\n  BUSINESS_LEVEL // Trình độ thương mại (không có N)\n  DAILY_CONVERSATION // Giao tiếp hàng ngày\n  NATIVE // Bản xứ\n  NONE // Không yêu cầu / Không có\n}\n\n/// Loại tệp CV\nenum FileTypeEnum {\n  pdf\n  doc\n  docx\n  other\n}\n\n// --- Core Models ---\n\n/// Bảng Users: Thông tin tài khoản cơ bản\nmodel User {\n  id           Int        @id @default(autoincrement()) @map(\"user_id\")\n  email        String     @unique @db.VarChar(255)\n  passwordHash String?    @map(\"password_hash\") @db.VarChar(255)\n  fullName     String     @map(\"full_name\") @db.VarChar(100) /// Tên hiển thị chung (Có thể là Romaji)\n  userType     UserType   @map(\"user_type\")\n  isActive     Boolean    @default(true) @map(\"is_active\")\n  createdAt    DateTime   @default(now()) @map(\"created_at\") @db.Timestamp(6)\n  updatedAt    DateTime   @updatedAt @map(\"updated_at\") @db.Timestamp(6)\n  avatar       String?\n  employer     Employer?\n  candidate    Candidate?\n\n  @@map(\"Users\")\n}\n\n/// Bảng Employers: Thông tin cơ bản nhà tuyển dụng\nmodel Employer {\n  id             Int     @id @default(autoincrement()) @map(\"employer_id\")\n  userId         Int     @unique @map(\"user_id\")\n  companyName    String  @map(\"company_name\") @db.VarChar(150) /// Tên công ty (Romaji/English)\n  companyNameJp  String? @map(\"company_name_jp\") @db.VarChar(150) /// Tên công ty (Kanji/Katakana)\n  companyLogoUrl String? @map(\"company_logo_url\") @db.VarChar(255) /// Ảnh đại diện công ty (có thể dùng làm logo)\n\n  user User  @relation(fields: [userId], references: [id], onDelete: Cascade)\n  jobs Job[]\n\n  createdAt DateTime @default(now()) @map(\"created_at\") @db.Timestamp(6)\n  updatedAt DateTime @updatedAt @map(\"updated_at\") @db.Timestamp(6)\n\n  @@map(\"Employers\")\n}\n\n/// Bảng Candidates: Thông tin ứng viên theo cấu trúc CV Nhật Bản (Rirekisho)\nmodel Candidate {\n  id               Int         @id @default(autoincrement()) @map(\"candidate_id\")\n  userId           Int         @unique @map(\"user_id\")\n  // --- Basic Info (基本情報) ---\n  fullNameKanji    String?     @map(\"full_name_kanji\") @db.VarChar(100) /// Họ và tên (氏名 - Kanji, nếu có)\n  fullNameKana     String?     @map(\"full_name_kana\") @db.VarChar(100) /// Họ và tên (フリガナ - Katakana/Hiragana)\n  dateOfBirth      DateTime?   @map(\"date_of_birth\") @db.Date /// Ngày sinh (生年月日)\n  gender           GenderType? /// Giới tính (性別)\n  currentAddressJp String?     @map(\"current_address_jp\") @db.Text /// Địa chỉ hiện tại (現住所 - Tiếng Nhật/Romaji)\n  phoneNumber      String?     @unique @map(\"phone_number\") @db.VarChar(20) /// Số điện thoại (電話番号)\n  email            String?     @map(\"email\") @db.VarChar(255) /// Địa chỉ email (メールアドレス) - Có thể lấy từ User hoặc cho nhập riêng\n  profilePhotoUrl  String?     @map(\"profile_photo_url\") @db.VarChar(255) /// Link ảnh thẻ (写真)\n\n  // --- Motivation, Strengths, Hobbies (志望動機・自己PR・趣味など) ---\n  motivation    String? @map(\"motivation\") @db.Text /// Lý do ứng tuyển (志望の動機)\n  selfPromotion String? @map(\"self_promotion\") @db.Text /// Giới thiệu bản thân/Điểm mạnh (自己PR)\n  hobbies       String? @map(\"hobbies\") @db.Text /// Sở thích (趣味・特技)\n\n  // --- Candidate Requests (本人希望記入欄) ---\n  candidateRequests   String?                   @map(\"candidate_requests\") @db.Text /// Mong muốn của ứng viên (Lương, vị trí, etc.)\n  preferredJobTypes   JobTypeEnum[]             @map(\"preferred_job_types\") /// Loại công việc mong muốn\n  // --- Language Skills ---\n  japaneseProficiency JapaneseProficiencyLevel? @map(\"japanese_proficiency\") /// Trình độ tiếng Nhật\n  otherLanguages      Json?                     @map(\"other_languages\") @db.JsonB /// Các ngôn ngữ khác { language: string, proficiency: ProficiencyLevel }[]\n\n  user           User             @relation(fields: [userId], references: [id], onDelete: Cascade)\n  education      Education[] /// Học vấn (学歴)\n  workExperience WorkExperience[] /// Kinh nghiệm làm việc (職歴)\n  qualifications Qualification[] /// Bằng cấp/Chứng chỉ (免許・資格)\n  cvs            CV[] /// Tệp CV đính kèm\n  applications   Application[]\n\n  createdAt DateTime @default(now()) @map(\"created_at\") @db.Timestamp(6)\n  updatedAt DateTime @updatedAt @map(\"updated_at\") @db.Timestamp(6)\n\n  @@map(\"Candidates\")\n}\n\n/// Bảng Education: Thông tin học vấn (学歴)\nmodel Education {\n  id             Int       @id @default(autoincrement()) @map(\"education_id\")\n  candidateId    Int       @map(\"candidate_id\")\n  startDate      DateTime  @map(\"start_date\") @db.Date /// Ngày nhập học (入学年月)\n  endDate        DateTime? @map(\"end_date\") @db.Date /// Ngày tốt nghiệp (卒業年月)\n  schoolName     String    @map(\"school_name\") @db.VarChar(255) /// Tên trường (学校名)\n  faculty        String?   @map(\"faculty\") @db.VarChar(150) /// Khoa (学部)\n  department     String?   @map(\"department\") @db.VarChar(150) /// Ngành (学科)\n  degreeOrStatus String?   @map(\"degree_or_status\") @db.VarChar(100) /// Bằng cấp hoặc trạng thái (e.g., 卒業, 中退, 在学中)\n\n  candidate Candidate @relation(fields: [candidateId], references: [id], onDelete: Cascade)\n\n  createdAt DateTime @default(now()) @map(\"created_at\") @db.Timestamp(6)\n  updatedAt DateTime @updatedAt @map(\"updated_at\") @db.Timestamp(6)\n\n  @@index([candidateId], map: \"idx_education_candidate_id\")\n  @@map(\"Education\")\n}\n\n/// Bảng WorkExperience: Thông tin kinh nghiệm làm việc (職歴)\nmodel WorkExperience {\n  id             Int          @id @default(autoincrement()) @map(\"experience_id\")\n  candidateId    Int          @map(\"candidate_id\")\n  startDate      DateTime     @map(\"start_date\") @db.Date /// Ngày vào công ty (入社年月)\n  endDate        DateTime?    @map(\"end_date\") @db.Date /// Ngày nghỉ việc (退社年月) - Null nếu đang làm (現在に至る)\n  isCurrent      Boolean      @default(false) @map(\"is_current\") /// Đánh dấu nếu đang làm việc tại đây\n  companyName    String       @map(\"company_name\") @db.VarChar(150) /// Tên công ty (会社名)\n  department     String?      @map(\"department\") @db.VarChar(150) /// Bộ phận (所属部署)\n  jobTitle       String?      @map(\"job_title\") @db.VarChar(150) /// Chức vụ (役職)\n  description    String?      @db.Text /// Mô tả công việc ngắn gọn (職務内容)\n  employmentType JobTypeEnum? @map(\"employment_type\") /// Loại hình làm việc (正社員, 契約社員, etc.)\n  candidate      Candidate    @relation(fields: [candidateId], references: [id], onDelete: Cascade)\n\n  createdAt DateTime @default(now()) @map(\"created_at\") @db.Timestamp(6)\n  updatedAt DateTime @updatedAt @map(\"updated_at\") @db.Timestamp(6)\n\n  @@index([candidateId], map: \"idx_workexperience_candidate_id\")\n  @@map(\"WorkExperience\")\n}\n\n/// Bảng Qualifications: Thông tin bằng cấp/chứng chỉ (免許・資格)\nmodel Qualification {\n  id          Int      @id @default(autoincrement()) @map(\"qualification_id\")\n  candidateId Int      @map(\"candidate_id\")\n  issueDate   DateTime @map(\"issue_date\") @db.Date /// Ngày cấp (取得年月)\n  name        String   @db.VarChar(255) /// Tên bằng cấp/chứng chỉ (免許・資格名)\n  status      String?  @db.VarChar(50) /// Trạng thái (取得, 合格, 見込み)\n\n  candidate Candidate @relation(fields: [candidateId], references: [id], onDelete: Cascade)\n\n  createdAt DateTime @default(now()) @map(\"created_at\") @db.Timestamp(6)\n  updatedAt DateTime @updatedAt @map(\"updated_at\") @db.Timestamp(6)\n\n  @@index([candidateId], map: \"idx_qualifications_candidate_id\")\n  @@map(\"Qualifications\")\n}\n\n/// Bảng Jobs: Thông tin tuyển dụng cơ bản\nmodel Job {\n  id                    Int                       @id @default(autoincrement()) @map(\"job_id\")\n  employerId            Int                       @map(\"employer_id\")\n  title                 String                    @db.VarChar(255) /// Tiêu đề công việc (Tiếng Anh/Việt)\n  titleJp               String?                   @map(\"title_jp\") @db.VarChar(255) /// Tiêu đề công việc (Tiếng Nhật)\n  description           String                    @db.Text /// Mô tả công việc (職務内容)\n  requirements          String?                   @db.Text /// Yêu cầu (応募資格)\n  salaryDetails         String?                   @map(\"salary_details\") @db.Text /// Chi tiết lương/thưởng (給与)\n  workLocation          String?                   @map(\"work_location\") @db.Text /// Địa điểm làm việc (勤務地)\n  workingHours          String?                   @map(\"working_hours\") @db.VarChar(255) /// Giờ làm việc (勤務時間)\n  jobType               JobTypeEnum               @map(\"job_type\") /// Loại hình công việc (雇用形態)\n  requiredJapaneseLevel JapaneseProficiencyLevel? @map(\"required_japanese_level\") /// Yêu cầu tiếng Nhật\n  status                JobStatus                 @default(PENDING)\n  postedDate            DateTime                  @default(now()) @map(\"posted_date\") @db.Timestamp(6)\n  expiryDate            DateTime?                 @map(\"expiry_date\") @db.Timestamp(6)\n\n  employer     Employer      @relation(fields: [employerId], references: [id], onDelete: Cascade)\n  applications Application[]\n\n  createdAt DateTime @default(now()) @map(\"created_at\") @db.Timestamp(6)\n  updatedAt DateTime @updatedAt @map(\"updated_at\") @db.Timestamp(6)\n\n  @@index([employerId], map: \"idx_jobs_employer\")\n  @@map(\"Jobs\")\n}\n\n/// Bảng CVs: Tệp CV đính kèm (Thường là file PDF/Word)\nmodel CV {\n  id          Int           @id @default(autoincrement()) @map(\"cv_id\")\n  candidateId Int           @map(\"candidate_id\")\n  fileName    String        @map(\"file_name\") @db.VarChar(255) /// Tên tệp\n  fileUrl     String        @map(\"file_url\") @db.VarChar(255) /// Đường dẫn tệp\n  fileType    FileTypeEnum? @map(\"file_type\") /// Loại tệp (PDF, DOCX)\n  language    String?       @db.VarChar(10) /// Ngôn ngữ CV ('ja', 'en', 'vi')\n  isPrimary   Boolean       @default(false) @map(\"is_primary\") /// Đánh dấu CV chính (nếu có nhiều)\n  uploadedAt  DateTime      @default(now()) @map(\"uploaded_at\") @db.Timestamp(6)\n\n  candidate    Candidate     @relation(fields: [candidateId], references: [id], onDelete: Cascade)\n  applications Application[]\n\n  @@index([candidateId], map: \"idx_cvs_candidate_id\")\n  @@map(\"CVs\")\n}\n\n/// Bảng Applications: Thông tin ứng tuyển cơ bản\nmodel Application {\n  id              Int               @id @default(autoincrement()) @map(\"application_id\")\n  candidateId     Int               @map(\"candidate_id\")\n  jobId           Int               @map(\"job_id\")\n  cvId            Int               @map(\"cv_id\") /// CV đã dùng để ứng tuyển\n  applicationDate DateTime          @default(now()) @map(\"application_date\") @db.Timestamp(6)\n  status          ApplicationStatus @default(submitted)\n  coverLetter     String?           @map(\"cover_letter\") @db.Text /// Thư xin việc ngắn (nếu có, tách rời CV)\n\n  candidate Candidate @relation(fields: [candidateId], references: [id], onDelete: Cascade)\n  job       Job       @relation(fields: [jobId], references: [id], onDelete: Cascade)\n  cv        CV        @relation(fields: [cvId], references: [id], onDelete: Restrict) // Prevent deleting a CV used in an application\n\n  createdAt DateTime @default(now()) @map(\"created_at\") @db.Timestamp(6)\n  updatedAt DateTime @updatedAt @map(\"updated_at\") @db.Timestamp(6)\n\n  @@unique([candidateId, jobId]) // Candidate can only apply once per job\n  @@index([jobId], map: \"idx_applications_job\")\n  @@index([candidateId], map: \"idx_applications_candidate\")\n  @@map(\"Applications\")\n}\n",
  "inlineSchemaHash": "8b768d41abddb236146c39d5364ea687172f406e5d78b69768f85985fadfc094",
  "copyEngine": true
}

const fs = require('fs')

config.dirname = __dirname
if (!fs.existsSync(path.join(__dirname, 'schema.prisma'))) {
  const alternativePaths = [
    "generated/prisma",
    "prisma",
  ]
  
  const alternativePath = alternativePaths.find((altPath) => {
    return fs.existsSync(path.join(process.cwd(), altPath, 'schema.prisma'))
  }) ?? alternativePaths[0]

  config.dirname = path.join(process.cwd(), alternativePath)
  config.isBundled = true
}

config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"dbName\":\"Users\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"255\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"passwordHash\",\"dbName\":\"password_hash\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"255\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fullName\",\"dbName\":\"full_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"100\"]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Tên hiển thị chung (Có thể là Romaji)\"},{\"name\":\"userType\",\"dbName\":\"user_type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UserType\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isActive\",\"dbName\":\"is_active\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"avatar\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"employer\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Employer\",\"nativeType\":null,\"relationName\":\"EmployerToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"candidate\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Candidate\",\"nativeType\":null,\"relationName\":\"CandidateToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"Bảng Users: Thông tin tài khoản cơ bản\"},\"Employer\":{\"dbName\":\"Employers\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"dbName\":\"employer_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"companyName\",\"dbName\":\"company_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"150\"]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Tên công ty (Romaji/English)\"},{\"name\":\"companyNameJp\",\"dbName\":\"company_name_jp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"150\"]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Tên công ty (Kanji/Katakana)\"},{\"name\":\"companyLogoUrl\",\"dbName\":\"company_logo_url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"255\"]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Ảnh đại diện công ty (có thể dùng làm logo)\"},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"nativeType\":null,\"relationName\":\"EmployerToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"jobs\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Job\",\"nativeType\":null,\"relationName\":\"EmployerToJob\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"Bảng Employers: Thông tin cơ bản nhà tuyển dụng\"},\"Candidate\":{\"dbName\":\"Candidates\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"dbName\":\"candidate_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fullNameKanji\",\"dbName\":\"full_name_kanji\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"100\"]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Họ và tên (氏名 - Kanji, nếu có)\"},{\"name\":\"fullNameKana\",\"dbName\":\"full_name_kana\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"100\"]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Họ và tên (フリガナ - Katakana/Hiragana)\"},{\"name\":\"dateOfBirth\",\"dbName\":\"date_of_birth\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Date\",[]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Ngày sinh (生年月日)\"},{\"name\":\"gender\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"GenderType\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Giới tính (性別)\"},{\"name\":\"currentAddressJp\",\"dbName\":\"current_address_jp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Địa chỉ hiện tại (現住所 - Tiếng Nhật/Romaji)\"},{\"name\":\"phoneNumber\",\"dbName\":\"phone_number\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"20\"]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Số điện thoại (電話番号)\"},{\"name\":\"email\",\"dbName\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"255\"]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Địa chỉ email (メールアドレス) - Có thể lấy từ User hoặc cho nhập riêng\"},{\"name\":\"profilePhotoUrl\",\"dbName\":\"profile_photo_url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"255\"]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Link ảnh thẻ (写真)\"},{\"name\":\"motivation\",\"dbName\":\"motivation\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Lý do ứng tuyển (志望の動機)\"},{\"name\":\"selfPromotion\",\"dbName\":\"self_promotion\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Giới thiệu bản thân/Điểm mạnh (自己PR)\"},{\"name\":\"hobbies\",\"dbName\":\"hobbies\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Sở thích (趣味・特技)\"},{\"name\":\"candidateRequests\",\"dbName\":\"candidate_requests\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Mong muốn của ứng viên (Lương, vị trí, etc.)\"},{\"name\":\"preferredJobTypes\",\"dbName\":\"preferred_job_types\",\"kind\":\"enum\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"JobTypeEnum\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Loại công việc mong muốn\"},{\"name\":\"japaneseProficiency\",\"dbName\":\"japanese_proficiency\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"JapaneseProficiencyLevel\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Trình độ tiếng Nhật\"},{\"name\":\"otherLanguages\",\"dbName\":\"other_languages\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"nativeType\":[\"JsonB\",[]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Các ngôn ngữ khác { language: string, proficiency: ProficiencyLevel }[]\"},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"nativeType\":null,\"relationName\":\"CandidateToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"education\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Education\",\"nativeType\":null,\"relationName\":\"CandidateToEducation\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Học vấn (学歴)\"},{\"name\":\"workExperience\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"WorkExperience\",\"nativeType\":null,\"relationName\":\"CandidateToWorkExperience\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Kinh nghiệm làm việc (職歴)\"},{\"name\":\"qualifications\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Qualification\",\"nativeType\":null,\"relationName\":\"CandidateToQualification\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Bằng cấp/Chứng chỉ (免許・資格)\"},{\"name\":\"cvs\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CV\",\"nativeType\":null,\"relationName\":\"CVToCandidate\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Tệp CV đính kèm\"},{\"name\":\"applications\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Application\",\"nativeType\":null,\"relationName\":\"ApplicationToCandidate\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"Bảng Candidates: Thông tin ứng viên theo cấu trúc CV Nhật Bản (Rirekisho)\"},\"Education\":{\"dbName\":\"Education\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"dbName\":\"education_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"candidateId\",\"dbName\":\"candidate_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"startDate\",\"dbName\":\"start_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Date\",[]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Ngày nhập học (入学年月)\"},{\"name\":\"endDate\",\"dbName\":\"end_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Date\",[]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Ngày tốt nghiệp (卒業年月)\"},{\"name\":\"schoolName\",\"dbName\":\"school_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"255\"]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Tên trường (学校名)\"},{\"name\":\"faculty\",\"dbName\":\"faculty\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"150\"]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Khoa (学部)\"},{\"name\":\"department\",\"dbName\":\"department\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"150\"]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Ngành (学科)\"},{\"name\":\"degreeOrStatus\",\"dbName\":\"degree_or_status\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"100\"]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Bằng cấp hoặc trạng thái (e.g., 卒業, 中退, 在学中)\"},{\"name\":\"candidate\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Candidate\",\"nativeType\":null,\"relationName\":\"CandidateToEducation\",\"relationFromFields\":[\"candidateId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"Bảng Education: Thông tin học vấn (学歴)\"},\"WorkExperience\":{\"dbName\":\"WorkExperience\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"dbName\":\"experience_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"candidateId\",\"dbName\":\"candidate_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"startDate\",\"dbName\":\"start_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Date\",[]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Ngày vào công ty (入社年月)\"},{\"name\":\"endDate\",\"dbName\":\"end_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Date\",[]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Ngày nghỉ việc (退社年月) - Null nếu đang làm (現在に至る)\"},{\"name\":\"isCurrent\",\"dbName\":\"is_current\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Đánh dấu nếu đang làm việc tại đây\"},{\"name\":\"companyName\",\"dbName\":\"company_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"150\"]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Tên công ty (会社名)\"},{\"name\":\"department\",\"dbName\":\"department\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"150\"]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Bộ phận (所属部署)\"},{\"name\":\"jobTitle\",\"dbName\":\"job_title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"150\"]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Chức vụ (役職)\"},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Mô tả công việc ngắn gọn (職務内容)\"},{\"name\":\"employmentType\",\"dbName\":\"employment_type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"JobTypeEnum\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Loại hình làm việc (正社員, 契約社員, etc.)\"},{\"name\":\"candidate\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Candidate\",\"nativeType\":null,\"relationName\":\"CandidateToWorkExperience\",\"relationFromFields\":[\"candidateId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"Bảng WorkExperience: Thông tin kinh nghiệm làm việc (職歴)\"},\"Qualification\":{\"dbName\":\"Qualifications\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"dbName\":\"qualification_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"candidateId\",\"dbName\":\"candidate_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"issueDate\",\"dbName\":\"issue_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Date\",[]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Ngày cấp (取得年月)\"},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"255\"]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Tên bằng cấp/chứng chỉ (免許・資格名)\"},{\"name\":\"status\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Trạng thái (取得, 合格, 見込み)\"},{\"name\":\"candidate\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Candidate\",\"nativeType\":null,\"relationName\":\"CandidateToQualification\",\"relationFromFields\":[\"candidateId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"Bảng Qualifications: Thông tin bằng cấp/chứng chỉ (免許・資格)\"},\"Job\":{\"dbName\":\"Jobs\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"dbName\":\"job_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"employerId\",\"dbName\":\"employer_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"255\"]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Tiêu đề công việc (Tiếng Anh/Việt)\"},{\"name\":\"titleJp\",\"dbName\":\"title_jp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"255\"]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Tiêu đề công việc (Tiếng Nhật)\"},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Mô tả công việc (職務内容)\"},{\"name\":\"requirements\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Yêu cầu (応募資格)\"},{\"name\":\"salaryDetails\",\"dbName\":\"salary_details\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Chi tiết lương/thưởng (給与)\"},{\"name\":\"workLocation\",\"dbName\":\"work_location\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Địa điểm làm việc (勤務地)\"},{\"name\":\"workingHours\",\"dbName\":\"working_hours\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"255\"]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Giờ làm việc (勤務時間)\"},{\"name\":\"jobType\",\"dbName\":\"job_type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"JobTypeEnum\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Loại hình công việc (雇用形態)\"},{\"name\":\"requiredJapaneseLevel\",\"dbName\":\"required_japanese_level\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"JapaneseProficiencyLevel\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Yêu cầu tiếng Nhật\"},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"JobStatus\",\"nativeType\":null,\"default\":\"PENDING\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"postedDate\",\"dbName\":\"posted_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expiryDate\",\"dbName\":\"expiry_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"employer\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Employer\",\"nativeType\":null,\"relationName\":\"EmployerToJob\",\"relationFromFields\":[\"employerId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"applications\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Application\",\"nativeType\":null,\"relationName\":\"ApplicationToJob\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"Bảng Jobs: Thông tin tuyển dụng cơ bản\"},\"CV\":{\"dbName\":\"CVs\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"dbName\":\"cv_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"candidateId\",\"dbName\":\"candidate_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fileName\",\"dbName\":\"file_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"255\"]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Tên tệp\"},{\"name\":\"fileUrl\",\"dbName\":\"file_url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"255\"]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Đường dẫn tệp\"},{\"name\":\"fileType\",\"dbName\":\"file_type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"FileTypeEnum\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Loại tệp (PDF, DOCX)\"},{\"name\":\"language\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"10\"]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Ngôn ngữ CV ('ja', 'en', 'vi')\"},{\"name\":\"isPrimary\",\"dbName\":\"is_primary\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Đánh dấu CV chính (nếu có nhiều)\"},{\"name\":\"uploadedAt\",\"dbName\":\"uploaded_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"candidate\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Candidate\",\"nativeType\":null,\"relationName\":\"CVToCandidate\",\"relationFromFields\":[\"candidateId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"applications\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Application\",\"nativeType\":null,\"relationName\":\"ApplicationToCV\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"Bảng CVs: Tệp CV đính kèm (Thường là file PDF/Word)\"},\"Application\":{\"dbName\":\"Applications\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"dbName\":\"application_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"candidateId\",\"dbName\":\"candidate_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"jobId\",\"dbName\":\"job_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cvId\",\"dbName\":\"cv_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"CV đã dùng để ứng tuyển\"},{\"name\":\"applicationDate\",\"dbName\":\"application_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"ApplicationStatus\",\"nativeType\":null,\"default\":\"submitted\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"coverLetter\",\"dbName\":\"cover_letter\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Thư xin việc ngắn (nếu có, tách rời CV)\"},{\"name\":\"candidate\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Candidate\",\"nativeType\":null,\"relationName\":\"ApplicationToCandidate\",\"relationFromFields\":[\"candidateId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"job\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Job\",\"nativeType\":null,\"relationName\":\"ApplicationToJob\",\"relationFromFields\":[\"jobId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cv\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CV\",\"nativeType\":null,\"relationName\":\"ApplicationToCV\",\"relationFromFields\":[\"cvId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Restrict\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[\"6\"]],\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamp\",[\"6\"]],\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[[\"candidateId\",\"jobId\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"candidateId\",\"jobId\"]}],\"isGenerated\":false,\"documentation\":\"Bảng Applications: Thông tin ứng tuyển cơ bản\"}},\"enums\":{\"UserType\":{\"values\":[{\"name\":\"CANDIDATE\",\"dbName\":null},{\"name\":\"EMPLOYER\",\"dbName\":null},{\"name\":\"ADMIN\",\"dbName\":null}],\"dbName\":null},\"GenderType\":{\"values\":[{\"name\":\"MALE\",\"dbName\":null},{\"name\":\"FEMALE\",\"dbName\":null},{\"name\":\"OTHER\",\"dbName\":null},{\"name\":\"PREFER_NOT_TO_SAY\",\"dbName\":null}],\"dbName\":null},\"JobTypeEnum\":{\"values\":[{\"name\":\"full_time\",\"dbName\":null},{\"name\":\"part_time\",\"dbName\":null},{\"name\":\"contract\",\"dbName\":null},{\"name\":\"temporary\",\"dbName\":null},{\"name\":\"internship\",\"dbName\":null},{\"name\":\"freelance\",\"dbName\":null}],\"dbName\":null,\"documentation\":\"Loại hình công việc (Toàn thời gian, Bán thời gian, v.v.)\"},\"ProficiencyLevel\":{\"values\":[{\"name\":\"beginner\",\"dbName\":null},{\"name\":\"intermediate\",\"dbName\":null},{\"name\":\"advanced\",\"dbName\":null},{\"name\":\"expert\",\"dbName\":null},{\"name\":\"native\",\"dbName\":null}],\"dbName\":null,\"documentation\":\"Mức độ thành thạo kỹ năng/ngôn ngữ\"},\"JobStatus\":{\"values\":[{\"name\":\"PENDING\",\"dbName\":null},{\"name\":\"APPROVED\",\"dbName\":null},{\"name\":\"REJECTED\",\"dbName\":null},{\"name\":\"CLOSED\",\"dbName\":null},{\"name\":\"DRAFT\",\"dbName\":null}],\"dbName\":null,\"documentation\":\"Trạng thái công việc\"},\"ApplicationStatus\":{\"values\":[{\"name\":\"submitted\",\"dbName\":null},{\"name\":\"under_review\",\"dbName\":null},{\"name\":\"interviewing\",\"dbName\":null},{\"name\":\"offer_made\",\"dbName\":null},{\"name\":\"rejected\",\"dbName\":null},{\"name\":\"withdrawn\",\"dbName\":null}],\"dbName\":null,\"documentation\":\"Trạng thái ứng tuyển\"},\"JapaneseProficiencyLevel\":{\"values\":[{\"name\":\"N1\",\"dbName\":null},{\"name\":\"N2\",\"dbName\":null},{\"name\":\"N3\",\"dbName\":null},{\"name\":\"N4\",\"dbName\":null},{\"name\":\"N5\",\"dbName\":null},{\"name\":\"BUSINESS_LEVEL\",\"dbName\":null},{\"name\":\"DAILY_CONVERSATION\",\"dbName\":null},{\"name\":\"NATIVE\",\"dbName\":null},{\"name\":\"NONE\",\"dbName\":null}],\"dbName\":null,\"documentation\":\"Trình độ tiếng Nhật (JLPT hoặc tương đương)\"},\"FileTypeEnum\":{\"values\":[{\"name\":\"pdf\",\"dbName\":null},{\"name\":\"doc\",\"dbName\":null},{\"name\":\"docx\",\"dbName\":null},{\"name\":\"other\",\"dbName\":null}],\"dbName\":null,\"documentation\":\"Loại tệp CV\"}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined
config.compilerWasm = undefined


const { warnEnvConflicts } = require('./runtime/library.js')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.schemaEnvPath)
})

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

// file annotations for bundling tools to include these files
path.join(__dirname, "query_engine-windows.dll.node");
path.join(process.cwd(), "generated/prisma/query_engine-windows.dll.node")
// file annotations for bundling tools to include these files
path.join(__dirname, "schema.prisma");
path.join(process.cwd(), "generated/prisma/schema.prisma")
