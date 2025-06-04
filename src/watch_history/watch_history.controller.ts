import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { WatchHistoryService } from './watch_history.service';
import { CreateWatchHistoryDto } from './dto/create-watch_history.dto';
import { UpdateWatchHistoryDto } from './dto/update-watch_history.dto';

@ApiTags('watch-histories')
@Controller('watch-histories')
export class WatchHistoryController {
  constructor(private readonly watchHistoryService: WatchHistoryService) {}

  @Post()
  @ApiOperation({ summary: "Yangi ko'rish tarixini yaratish" })
  @ApiBody({ type: CreateWatchHistoryDto })
  @ApiResponse({ status: 201, description: "Ko'rish tarixi muvaffaqiyatli yaratildi" })
  create(@Body() createWatchHistoryDto: CreateWatchHistoryDto) {
    return this.watchHistoryService.create(createWatchHistoryDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha ko'rish tarixlarini olish" })
  @ApiResponse({ status: 200, description: "Ko'rish tarixlari ro'yxati" })
  findAll() {
    return this.watchHistoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "ID bo'yicha ko'rish tarixini olish" })
  @ApiParam({ name: 'id', type: Number, description: "Ko'rish tarixi identifikatori" })
  @ApiResponse({ status: 200, description: "Ko'rish tarixi topildi" })
  @ApiResponse({ status: 404, description: "Ko'rish tarixi topilmadi" })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.watchHistoryService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "ID bo'yicha ko'rish tarixini yangilash" })
  @ApiParam({ name: 'id', type: Number, description: "Ko'rish tarixi identifikatori" })
  @ApiBody({ type: UpdateWatchHistoryDto })
  @ApiResponse({ status: 200, description: "Ko'rish tarixi muvaffaqiyatli yangilandi" })
  @ApiResponse({ status: 404, description: "Ko'rish tarixi topilmadi" })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateWatchHistoryDto: UpdateWatchHistoryDto) {
    return this.watchHistoryService.update(id, updateWatchHistoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "ID bo'yicha ko'rish tarixini o'chirish" })
  @ApiParam({ name: 'id', type: Number, description: "Ko'rish tarixi identifikatori" })
  @ApiResponse({ status: 200, description: "Ko'rish tarixi muvaffaqiyatli o'chirildi" })
  @ApiResponse({ status: 404, description: "Ko'rish tarixi topilmadi" })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.watchHistoryService.remove(id);
  }
}
