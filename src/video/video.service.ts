import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VideoService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createVideoDto: CreateVideoDto) {
    return this.prismaService.video.create({
      data: createVideoDto,
    });
  }

  async findAll() {
    return this.prismaService.video.findMany();
  }

  async findOne(id: number) {
    const video = await this.prismaService.video.findUnique({
      where: { id },
      include: {
        comments: true,
        likes: true
      },
    });

    if (!video) throw new NotFoundException("Video topilmadi");

    return video;
  }

  async update(id: number, updateVideoDto: UpdateVideoDto) {
    return this.prismaService.video.update({
      where: { id },
      data: updateVideoDto,
    });
  }

  async remove(id: number) {
    return this.prismaService.video.delete({
      where: { id },
    });
  }

  async viewVideo(id: number) {
    const updatedVideo = await this.prismaService.video.update({
      where: { id },
      data: {
        views: { increment: 1 },
      },
    });

    if (!updatedVideo) {
      throw new NotFoundException("Video topilmadi");
    }

    return updatedVideo;
  }
}
