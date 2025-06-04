import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateReportDto) {
    return this.prisma.report.create({
      data: {
        reason: dto.reason,
        status:dto.status,
        reporter: { connect: { id: dto.reportedBy } },
        video:{connect:{id:dto.videoId}}
      },
    });
  }

  async findAll() {
    return this.prisma.report.findMany({
      include: {
        reporter: true,
        video: true,
      },
    });
  }

  async findOne(id: number) {
    const report = await this.prisma.report.findUnique({
      where: { id },
      include: {
        reporter: true,
        video: true,
      },
    });

    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }

    return report;
  }

  async update(id: number, dto: UpdateReportDto) {
    await this.findOne(id); // Check if report exists

    return this.prisma.report.update({
      where: { id },
      data: dto
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.report.delete({
      where: { id },
    });
  }
}
