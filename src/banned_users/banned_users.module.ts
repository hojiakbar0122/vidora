import { Module } from '@nestjs/common';
import { BannedUsersService } from './banned_users.service';
import { BannedUsersController } from './banned_users.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [BannedUsersController],
  providers: [BannedUsersService],
})
export class BannedUsersModule {}
