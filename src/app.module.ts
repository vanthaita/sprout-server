import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { PrismaService } from './modules/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CandidateModule } from './modules/candidate/candidate.module';
import { EmployeeModule } from './modules/employee/employer.module';
import { RedisModule } from './core/redis/redis.module';

@Module({
  imports: [
    PrismaModule, 
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    RedisModule,
    UsersModule,
    CandidateModule,
    EmployeeModule,
  ],
  controllers: [],
  providers: [
    PrismaService
    
  ],
})
export class AppModule {}
