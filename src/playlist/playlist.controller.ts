import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { JwtSelfGuard } from '../common/guards/jwt-self.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AdminLevel } from '../common/decorators/admin-level.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiTags('playlists')
@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: "Yangi playlist yaratish" })
  @ApiBody({ type: CreatePlaylistDto })
  @ApiResponse({ status: 201, description: "Playlist muvaffaqiyatli yaratildi"})
  create(@Body() createPlaylistDto: CreatePlaylistDto) {
    return this.playlistService.create(createPlaylistDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminLevel("admin")
  @Get()
  @ApiOperation({ summary: "Barcha playlistlarni olish" })
  @ApiResponse({ status: 200, description: "Playlistlar ro'yxati"})
  findAll() {
    return this.playlistService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: "ID bo'yicha playlistni olish" })
  @ApiParam({ name: 'id', type: Number, description: "Playlist identifikatori" })
  @ApiResponse({ status: 200, description: "Playlist topildi"})
  @ApiResponse({ status: 404, description: "Playlist topilmadi" })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.playlistService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: "ID bo'yicha playlistni yangilash" })
  @ApiParam({ name: 'id', type: Number, description: "Playlist identifikatori" })
  @ApiBody({ type: UpdatePlaylistDto })
  @ApiResponse({ status: 200, description: "Playlist muvaffaqiyatli yangilandi"})
  @ApiResponse({ status: 404, description: "Playlist topilmadi" })
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePlaylistDto: UpdatePlaylistDto) {
    return this.playlistService.update(id, updatePlaylistDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: "ID bo'yicha playlistni o'chirish" })
  @ApiParam({ name: 'id', type: Number, description: "Playlist identifikatori" })
  @ApiResponse({ status: 200, description: "Playlist muvaffaqiyatli o'chirildi" })
  @ApiResponse({ status: 404, description: "Playlist topilmadi" })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.playlistService.remove(id);
  }
}
