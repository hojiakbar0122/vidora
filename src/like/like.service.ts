import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LikeService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createLikeDto: CreateLikeDto) {
    
    const like = await this.prismaService.like.create({
      data: createLikeDto,
    });
    return like
  }

  async findAll() {
    return this.prismaService.like.findMany();
  }

  async findOne(id: number) {
    const like = await this.prismaService.like.findUnique({
      where: { id },
    });

    if (!like) throw new NotFoundException("Like topilmadi");

    return like;
  }

  async update(id: number, updateLikeDto: UpdateLikeDto) {
    return this.prismaService.like.update({
      where: { id },
      data: updateLikeDto,
    });
  }

  async remove(id: number) {
    return this.prismaService.like.delete({
      where: { id },
    });
  }

  async liked(id: number) {
    const updatedLike = await this.prismaService.like.update({
      where: { id },
      data: {
        is_like: { increment: 1 },
      },
    });

    if (!updatedLike) {
      throw new NotFoundException("Like topilmadi");
    }

    return updatedLike;
  }
}
