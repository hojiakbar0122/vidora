import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCommentDto: CreateCommentDto) {
    return this.prismaService.comment.create({
      data: createCommentDto,
    });
  }

  async findAll() {
    return this.prismaService.comment.findMany({
      include: {
        user: true,    
        video: true,    
      },
    });
  }

  async findOne(id: number) {
    const comment = await this.prismaService.comment.findUnique({
      where: { id },
      include: {
        user: true,
        video: true,
      }
    });

    if (!comment) throw new NotFoundException('Comment topilmadi');

    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.prismaService.comment.update({
      where: { id },
      data: updateCommentDto,
    });
  }

  async remove(id: number) {
    return this.prismaService.comment.delete({
      where: { id },
    });
  }
}
