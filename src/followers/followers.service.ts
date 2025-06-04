import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFollowerDto } from './dto/create-follower.dto';
import { UpdateFollowerDto } from './dto/update-follower.dto';

@Injectable()
export class FollowersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateFollowerDto) {
    const { followerId, followingId } = dto;

    const exists = await this.prisma.follower.findFirst({
      where: {
        followerId,
        followingId,
      },
    });
    if (exists) {
      throw new Error('Already following this user');
    }

    return this.prisma.follower.create({
      data: {
        follower: { connect: { id: followerId } },
        following: { connect: { id: followingId } },
      },
      include: {
        follower: true,
        following: true,
      },
    });
  }

  async findAll() {
    return this.prisma.follower.findMany({
      include: {
        follower: true,
        following: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const follower = await this.prisma.follower.findUnique({
      where: { id },
      include: {
        follower: true,
        following: true,
      },
    });

    if (!follower) {
      throw new NotFoundException('Follower topilmadi');
    }

    return follower;
  }

  async update(id: number, dto: UpdateFollowerDto) {
    return this.prisma.follower.update({
      where: { id },
      data: dto,
      include: {
        follower: true,
        following: true,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.follower.delete({
      where: { id },
    });
  }
}
