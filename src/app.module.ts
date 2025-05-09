import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { PrismaService } from './modules/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CandidateModule } from './modules/candidate/candidate.module';
import { EmployeeModule } from './modules/employer/employer.module';
import { JobModule } from './modules/job/job.module';

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
    JobModule,
  ],
  controllers: [],
  providers: [
    PrismaService
    
  ],
})
export class AppModule {}
