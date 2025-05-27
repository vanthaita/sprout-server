import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { PrismaService } from './modules/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CandidateModule } from './modules/candidate/candidate.module';
import { EmployeeModule } from './modules/employer/employer.module';
import { JobModule } from './modules/job/job.module';
import { InterviewModule } from './modules/interview/interview.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { AwsS3Module } from './modules/aws/aws.module';

@Module({
  imports: [
    PrismaModule, 
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    UsersModule,
    CandidateModule,
    EmployeeModule,
    InterviewModule,
    CloudinaryModule,
    JobModule,
    AwsS3Module
  ],
  controllers: [],
  providers: [
    PrismaService
    
  ],
})
export class AppModule {}
