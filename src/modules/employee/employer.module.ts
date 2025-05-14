import { Module } from '@nestjs/common';
import { EmployerService } from './employer.service';
import { EmployerController } from './employer.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module'; 

@Module({
  imports: [AuthModule],
  controllers: [EmployerController],
  providers: [EmployerService, PrismaService],
})
export class EmployeeModule {}
