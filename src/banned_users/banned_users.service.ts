import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBannedUserDto } from './dto/create-banned_user.dto';
import { UpdateBannedUserDto } from './dto/update-banned_user.dto';

@Injectable()
export class BannedUsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateBannedUserDto) {
    return this.prisma.banned_User.create({
      data: {
        reason: dto.reason,
        user: {
          connect: { id: dto.userId },
        },
        admin: {
          connect: { id: dto.bannedBy },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.banned_User.findMany({
      include: {
        user: true,
      },
    });
  }

  async findOne(id: number) {
    const bannedUser = await this.prisma.banned_User.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!bannedUser) {
      throw new NotFoundException('Banned user not found');
    }

    return bannedUser;
  }

  async update(id: number, dto: UpdateBannedUserDto) {
    return this.prisma.banned_User.update({
      where: { id },
      data: dto
    });
  }

  async remove(id: number) {
    return this.prisma.banned_User.delete({
      where: { id },
    });
  }
}
