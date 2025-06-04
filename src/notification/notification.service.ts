import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const { message, userId, videoId } = createNotificationDto;

    return this.prisma.notification.create({
      data: {
        message,
        user: { connect: { id: userId } },
        ...(videoId && { video: { connect: { id: videoId } } }),
      },
      include: {
        user: true,
        video: true,
      },
    });
  }

  async findAll() {
    return this.prisma.notification.findMany({
      include: {
        user: true,
        video: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.notification.findUnique({
      where: { id },
      include: {
        user: true,
        video: {
          include: {
            comments: true,
            likes: true,
          },
        },
      },
    });
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return this.prisma.notification.update({
      where: { id },
      data: updateNotificationDto,
      include: {
        user: true,
        video: true,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.notification.delete({
      where: { id },
    });
  }
}
