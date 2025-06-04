import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlaylistVideoDto } from './dto/create-playlist_video.dto';
import { UpdatePlaylistVideoDto } from './dto/update-playlist_video.dto';

@Injectable()
export class PlaylistVideosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePlaylistVideoDto) {
    return this.prisma.playlist_Video.create({
      data: dto
    });
  }

  async findAll() {
    return this.prisma.playlist_Video.findMany({
      include: {
        playlist: true,
        video: true,
      },
    });
  }

  async findOne(id: number) {
    const item = await this.prisma.playlist_Video.findUnique({
      where: { id },
      include: {
        playlist: true,
        video: true,
      },
    });

    if (!item) {
      throw new NotFoundException(`PlaylistVideo with ID ${id} not found`);
    }

    return item;
  }

  async update(id: number, dto: UpdatePlaylistVideoDto) {
    await this.findOne(id); // check if exists

    return this.prisma.playlist_Video.update({
      where: { id },
      data: dto
    });
  }

  async remove(id: number) {
    await this.findOne(id); // check if exists

    return this.prisma.playlist_Video.delete({
      where: { id },
    });
  }
}
