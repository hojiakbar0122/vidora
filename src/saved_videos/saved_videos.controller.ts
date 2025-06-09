import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { SavedVideosService } from './saved_videos.service';
import { CreateSavedVideoDto } from './dto/create-saved_video.dto';
import { UpdateSavedVideoDto } from './dto/update-saved_video.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AdminLevel } from '../common/decorators/admin-level.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiTags('saved-videos')
@Controller('saved-videos')
export class SavedVideosController {
  constructor(private readonly savedVideosService: SavedVideosService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: "Yangi saqlangan video yaratish" })
  @ApiBody({ type: CreateSavedVideoDto })
  @ApiResponse({ status: 201, description: "Video muvaffaqiyatli saqlandi" })
  create(@Body() createSavedVideoDto: CreateSavedVideoDto) {
    return this.savedVideosService.create(createSavedVideoDto);
  }


  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminLevel("admin")
  @Get()
  @ApiOperation({ summary: "Barcha saqlangan videolarni olish" })
  @ApiResponse({ status: 200, description: "Saqlangan videolar ro'yxati" })
  findAll() {
    return this.savedVideosService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: "ID bo'yicha saqlangan videoni olish" })
  @ApiParam({ name: 'id', type: Number, description: "Saqlangan video identifikatori" })
  @ApiResponse({ status: 200, description: "Saqlangan video topildi" })
  @ApiResponse({ status: 404, description: "Saqlangan video topilmadi" })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.savedVideosService.findOne(id);
  }


  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminLevel("admin")
  @Patch(':id')
  @ApiOperation({ summary: "ID bo'yicha saqlangan videoni yangilash" })
  @ApiParam({ name: 'id', type: Number, description: "Saqlangan video identifikatori" })
  @ApiBody({ type: UpdateSavedVideoDto })
  @ApiResponse({ status: 200, description: "Saqlangan video muvaffaqiyatli yangilandi" })
  @ApiResponse({ status: 404, description: "Saqlangan video topilmadi" })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSavedVideoDto: UpdateSavedVideoDto) {
    return this.savedVideosService.update(id, updateSavedVideoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: "ID bo'yicha saqlangan videoni o'chirish" })
  @ApiParam({ name: 'id', type: Number, description: "Saqlangan video identifikatori" })
  @ApiResponse({ status: 200, description: "Saqlangan video muvaffaqiyatli o'chirildi" })
  @ApiResponse({ status: 404, description: "Saqlangan video topilmadi" })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.savedVideosService.remove(id);
  }
}
