import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { PlaylistVideosService } from './playlist_videos.service';
import { CreatePlaylistVideoDto } from './dto/create-playlist_video.dto';
import { UpdatePlaylistVideoDto } from './dto/update-playlist_video.dto';
import { JwtSelfGuard } from '../common/guards/jwt-self.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AdminLevel } from '../common/decorators/admin-level.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiTags('playlist-videos')
@Controller('playlist-videos')
export class PlaylistVideosController {
  constructor(private readonly playlistVideosService: PlaylistVideosService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: "Yangi playlist video qo'shish" })
  @ApiBody({ type: CreatePlaylistVideoDto })
  @ApiResponse({ status: 201, description: "Playlist videosi muvaffaqiyatli yaratildi" })
  create(@Body() createPlaylistVideoDto: CreatePlaylistVideoDto) {
    return this.playlistVideosService.create(createPlaylistVideoDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminLevel("admin")
  @Get()
  @ApiOperation({ summary: "Barcha playlist videolarini olish" })
  @ApiResponse({ status: 200, description: "Playlist videolar ro'yxati" })
  findAll() {
    return this.playlistVideosService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: "ID bo'yicha playlist videosini olish" })
  @ApiParam({ name: 'id', type: Number, description: "Playlist video identifikatori" })
  @ApiResponse({ status: 200, description: "Playlist video topildi" })
  @ApiResponse({ status: 404, description: "Playlist video topilmadi" })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.playlistVideosService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: "ID bo'yicha playlist videosini yangilash" })
  @ApiParam({ name: 'id', type: Number, description: "Playlist video identifikatori" })
  @ApiBody({ type: UpdatePlaylistVideoDto })
  @ApiResponse({ status: 200, description: "Playlist video muvaffaqiyatli yangilandi" })
  @ApiResponse({ status: 404, description: "Playlist video topilmadi" })
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePlaylistVideoDto: UpdatePlaylistVideoDto) {
    return this.playlistVideosService.update(id, updatePlaylistVideoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: "ID bo'yicha playlist videosini o'chirish" })
  @ApiParam({ name: 'id', type: Number, description: "Playlist video identifikatori" })
  @ApiResponse({ status: 200, description: "Playlist video muvaffaqiyatli o'chirildi" })
  @ApiResponse({ status: 404, description: "Playlist video topilmadi" })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.playlistVideosService.remove(id);
  }
}
