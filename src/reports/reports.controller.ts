import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi shikoyat yaratish" })
  @ApiBody({ type: CreateReportDto })
  @ApiResponse({ status: 201, description: "Shikoyat muvaffaqiyatli yaratildi" })
  create(@Body() createReportDto: CreateReportDto) {
    return this.reportsService.create(createReportDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha shikoyatlarni olish" })
  @ApiResponse({ status: 200, description: "Shikoyatlar ro'yxati" })
  findAll() {
    return this.reportsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "ID bo'yicha shikoyatni olish" })
  @ApiParam({ name: 'id', type: Number, description: "Shikoyat identifikatori" })
  @ApiResponse({ status: 200, description: "Shikoyat topildi" })
  @ApiResponse({ status: 404, description: "Shikoyat topilmadi" })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reportsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "ID bo'yicha shikoyatni yangilash" })
  @ApiParam({ name: 'id', type: Number, description: "Shikoyat identifikatori" })
  @ApiBody({ type: UpdateReportDto })
  @ApiResponse({ status: 200, description: "Shikoyat muvaffaqiyatli yangilandi" })
  @ApiResponse({ status: 404, description: "Shikoyat topilmadi" })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateReportDto: UpdateReportDto) {
    return this.reportsService.update(id, updateReportDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "ID bo'yicha shikoyatni o'chirish" })
  @ApiParam({ name: 'id', type: Number, description: "Shikoyat identifikatori" })
  @ApiResponse({ status: 200, description: "Shikoyat muvaffaqiyatli o'chirildi" })
  @ApiResponse({ status: 404, description: "Shikoyat topilmadi" })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reportsService.remove(id);
  }
}
