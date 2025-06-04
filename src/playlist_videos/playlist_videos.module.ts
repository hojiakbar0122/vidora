import { Module } from '@nestjs/common';
import { PlaylistVideosService } from './playlist_videos.service';
import { PlaylistVideosController } from './playlist_videos.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [PlaylistVideosController],
  providers: [PlaylistVideosService],
})
export class PlaylistVideosModule {}
