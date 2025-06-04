import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';

@Injectable()
export class PlaylistService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPlaylistDto: CreatePlaylistDto) {
    return this.prisma.playlist.create({
      data: {
        name: createPlaylistDto.name,
        description: createPlaylistDto.description,
        user: {
          connect: { id: createPlaylistDto.userId },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.playlist.findMany({
      include: {
        user: true,
        playlist_videos: true,
      },
    });
  }

  async findOne(id: number) {
    const playlist = await this.prisma.playlist.findUnique({
      where: { id },
      include: {
        user: true,
        playlist_videos: true,
      },
    });

    if (!playlist) {
      throw new NotFoundException(`Playlist with ID ${id} not found`);
    }

    return playlist;
  }

  async update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    await this.findOne(id); // check existence

    return this.prisma.playlist.update({
      where: { id },
      data: {
        name: updatePlaylistDto.name,
        description: updatePlaylistDto.description,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id); // check existence

    return this.prisma.playlist.delete({
      where: { id },
    });
  }
}
