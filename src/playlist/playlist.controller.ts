import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';

@ApiTags('playlists')
@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  @ApiOperation({ summary: "Yangi playlist yaratish" })
  @ApiBody({ type: CreatePlaylistDto })
  @ApiResponse({ status: 201, description: "Playlist muvaffaqiyatli yaratildi"})
  create(@Body() createPlaylistDto: CreatePlaylistDto) {
    return this.playlistService.create(createPlaylistDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha playlistlarni olish" })
  @ApiResponse({ status: 200, description: "Playlistlar ro'yxati"})
  findAll() {
    return this.playlistService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "ID bo'yicha playlistni olish" })
  @ApiParam({ name: 'id', type: Number, description: "Playlist identifikatori" })
  @ApiResponse({ status: 200, description: "Playlist topildi"})
  @ApiResponse({ status: 404, description: "Playlist topilmadi" })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.playlistService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "ID bo'yicha playlistni yangilash" })
  @ApiParam({ name: 'id', type: Number, description: "Playlist identifikatori" })
  @ApiBody({ type: UpdatePlaylistDto })
  @ApiResponse({ status: 200, description: "Playlist muvaffaqiyatli yangilandi"})
  @ApiResponse({ status: 404, description: "Playlist topilmadi" })
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePlaylistDto: UpdatePlaylistDto) {
    return this.playlistService.update(id, updatePlaylistDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "ID bo'yicha playlistni o'chirish" })
  @ApiParam({ name: 'id', type: Number, description: "Playlist identifikatori" })
  @ApiResponse({ status: 200, description: "Playlist muvaffaqiyatli o'chirildi" })
  @ApiResponse({ status: 404, description: "Playlist topilmadi" })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.playlistService.remove(id);
  }
}
