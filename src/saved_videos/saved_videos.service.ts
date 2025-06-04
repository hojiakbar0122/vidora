import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSavedVideoDto } from './dto/create-saved_video.dto';
import { UpdateSavedVideoDto } from './dto/update-saved_video.dto';

@Injectable()
export class SavedVideosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSavedVideoDto) {
    return this.prisma.saved_Video.create({
      data: dto
    });
  }

  async findAll() {
    return this.prisma.saved_Video.findMany({
      include: {
        user: true,
        video: true,
      },
    });
  }

  async findOne(id: number) {
    const saved = await this.prisma.saved_Video.findUnique({
      where: { id },
      include: {
        user: true,
        video: true,
      },
    });

    if (!saved) {
      throw new NotFoundException(`SavedVideo with ID ${id} not found`);
    }

    return saved;
  }

  async update(id: number, dto: UpdateSavedVideoDto) {
    await this.findOne(id); // check if exists

    return this.prisma.saved_Video.update({
      where: { id },
      data: {
        userId: dto.userId,
        videoId: dto.videoId,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id); // check if exists

    return this.prisma.saved_Video.delete({
      where: { id },
    });
  }
}
