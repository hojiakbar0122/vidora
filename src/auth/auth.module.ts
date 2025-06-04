import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "../prisma/prisma.module";
import { UserAuthController } from "./user/auth.controller";
import { UserAuthService } from "./user/auth.service";
import { AdminAuthController } from "./admin/auth.controller";
import { AdminAuthService } from "./admin/auth.service";
import { UsersModule } from "../users/users.module";
import { MailModule } from "./user/mail/mail.module";
import { AdminsModule } from "../admins/admins.module";

@Module({
  imports: [
    JwtModule.register({ global: true }),
    PrismaModule,
    UsersModule,
    AdminsModule,
    MailModule,
  ],
  controllers: [UserAuthController, AdminAuthController],
  providers: [UserAuthService, AdminAuthService],
})
export class AuthModule {}
