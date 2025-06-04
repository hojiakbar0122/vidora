import { ApiProperty } from '@nestjs/swagger';
import { ReportStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReportDto {
  @ApiProperty({ example: 123, description: "Shikoyat qilgan foydalanuvchi IDsi" })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  reportedBy: number;

  @ApiProperty({ example: 456, description: "Shikoyat qilingan video IDsi" })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  videoId: number;

  @ApiProperty({ example: "Noto'g'ri kontent", description: "Shikoyat sababi" })
  @IsNotEmpty()
  @IsString()
  reason: string;

  @ApiProperty({ 
    example: ReportStatus.PENDING, 
    enum: ReportStatus, 
    description: "Shikoyat holati" 
  })
  @IsNotEmpty()
  @IsEnum(ReportStatus)
  status: ReportStatus;
}
