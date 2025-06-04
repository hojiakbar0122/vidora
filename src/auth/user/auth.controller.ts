import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from "@nestjs/common";
import { Response } from "express";
import { UserAuthService } from "./auth.service";
import { CreateUserDto } from "../../users/dto";
import { SignInDto } from "../dto/sign-in.dto";
import { CookieGetter } from "../../common/decorators/cookie-getter.decorator";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("User Authentication")
@Controller("user-auth")
export class UserAuthController {
  constructor(private readonly authService: UserAuthService) {}

  @ApiOperation({ summary: "Foydalanuvchini ro'yxatdan o'tkazish" })
  @Post("sign-up")
  async signUp(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signUp(createUserDto, res);
  }

  @ApiOperation({ summary: "Foydalanuvchini tizimga kirish (login)" })
  @HttpCode(200)
  @Post("sign-in")
  async signIn(
    @Body() signInUserDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signIn(signInUserDto, res);
  }

  @ApiOperation({ summary: "Foydalanuvchini tizimdan chiqish (logout)" })
  @HttpCode(200)
  @Post("sign-out")
  signOut(
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOut(refreshToken, res);
  }

  @ApiOperation({ summary: "Tokenni yangilash (refresh token)" })
  @HttpCode(200)
  @Post(":id/refresh")
  refresh(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshToken(id, refreshToken, res);
  }

  @ApiOperation({ summary: "Foydalanuvchini aktivlashtirish" })
  @Get("activate/:link")
  activateUser(@Param("link") link: string) {
    return this.authService.activateUser(link);
  }
}
