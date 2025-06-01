import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createContentDto: CreateContentDto) {
    return this.prismaService.content.create({
      data: createContentDto,
    });
  }

  async findAll() {
    return this.prismaService.content.findMany();
  }

  async findOne(id: number) {
    const content = await this.prismaService.content.findUnique({
      where: { id },
    });
    if (!content) throw new NotFoundException("Content topilmadi");
    return content;
  }

  async update(id: number, updateContentDto: UpdateContentDto) {
    return this.prismaService.content.update({
      where: { id },
      data: updateContentDto,
    });
  }

  async remove(id: number) {
    return this.prismaService.content.delete({
      where: { id },
    });
  }

  async viewContent(id: number) {
    const updatedContent = await this.prismaService.content.update({
      where: { id },
      data: {
        views: { increment: 1 },
      },
    });

    if (!updatedContent) {
      throw new NotFoundException("Video topilmadi");
    }

    return updatedContent;
  }
}
