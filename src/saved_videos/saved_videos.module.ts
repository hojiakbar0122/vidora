import { Module } from '@nestjs/common';
import { SavedVideosService } from './saved_videos.service';
import { SavedVideosController } from './saved_videos.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [SavedVideosController],
  providers: [SavedVideosService],
})
export class SavedVideosModule {}
