import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JobFilterDto } from '../employer/dto/job.dto';

@Injectable()
export class JobService {
    constructor(private prismaService: PrismaService) {}

    async getAllJob(filter: JobFilterDto) {
        const {
            search,
            jobTypes,
            status,
            page = 1,
            limit = 10,
        } = filter;
    
        const where = {} as any;
    
        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ];
        }
    
        if (jobTypes && jobTypes.length > 0) {
            where.jobType = { in: jobTypes };
        }
    
        if (status) {
            where.status = status;
        }
    
        const skip = (page - 1) * limit;
        
        const [jobs, totalCount] = await Promise.all([
            this.prismaService.job.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: { employer: true },
            }),
            this.prismaService.job.count({ where }),
        ]);
    
        return {
            data: jobs,
            pagination: {
                total: totalCount,
                page,
                limit,
                totalPages: Math.ceil(totalCount / limit),
            },
        };
    }
    
}