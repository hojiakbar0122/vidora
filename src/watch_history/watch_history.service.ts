import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateWatchHistoryDto } from "./dto/create-watch_history.dto";
import { UpdateWatchHistoryDto } from "./dto/update-watch_history.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class WatchHistoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createWatchHistoryDto: CreateWatchHistoryDto) {
    return this.prismaService.watch_History.create({
      data: createWatchHistoryDto,
    });
  }

  async findAll() {
    return this.prismaService.watch_History.findMany({
      include: {
        user: true,
        video: true,
      },
    });
  }

  async findOne(id: number) {
    const watch = await this.prismaService.watch_History.findUnique({
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

    if (!watch) {
      throw new NotFoundException("Watch history topilmadi");
    }

    return watch;
  }

  async update(id: number, updateWatchHistoryDto: UpdateWatchHistoryDto) {
    return this.prismaService.watch_History.update({
      where: { id },
      data: updateWatchHistoryDto,
    });
  }

  async remove(id: number) {
    return this.prismaService.watch_History.delete({
      where: { id },
    });
  }
}
