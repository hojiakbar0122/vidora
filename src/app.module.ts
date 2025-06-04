import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { AdminsModule } from "./admins/admins.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { VideoModule } from './video/video.module';
import { LikeModule } from './like/like.module';
import { CommentModule } from './comment/comment.module';
import { WatchHistoryModule } from './watch_history/watch_history.module';
import { NotificationModule } from './notification/notification.module';
import { FollowersModule } from './followers/followers.module';
import { PlaylistVideosModule } from './playlist_videos/playlist_videos.module';
import { PlaylistModule } from './playlist/playlist.module';
import { SavedVideosModule } from './saved_videos/saved_videos.module';
import { ReportsModule } from './reports/reports.module';
import { BannedUsersModule } from './banned_users/banned_users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    PrismaModule,
    UsersModule,
    AdminsModule,
    AuthModule,
    VideoModule,
    LikeModule,
    CommentModule,
    WatchHistoryModule,
    NotificationModule,
    FollowersModule,
    PlaylistVideosModule,
    PlaylistModule,
    SavedVideosModule,
    ReportsModule,
    BannedUsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
