import { Body, Controller, HttpCode, Param, ParseIntPipe, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { SignInDto } from '../dto/sign-in.dto';
import { AdminAuthService } from './auth.service';
import { CookieGetter } from '../../common/decorators/cookie-getter.decorator';
import { ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Admin Auth') // Swagger bo‘yicha tag
@Controller('admin-auth')
export class AdminAuthController {
  constructor(private readonly authService: AdminAuthService) {}

  @HttpCode(200)
  @Post("sign-in")
  @ApiOperation({ summary: 'Admin login qilish' })
  @ApiBody({ type: SignInDto })
  async signIn(
    @Body() signInAdminDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signIn(signInAdminDto, res);
  }

  @HttpCode(200)
  @Post("sign-out")
  @ApiOperation({ summary: 'Admin logout qilish' })
  signOut(
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOut(refreshToken, res);
  }

  @HttpCode(200)
  @Post(":id/refresh")
  @ApiOperation({ summary: 'Tokenni yangilash (refresh)' })
  @ApiParam({ name: 'id', type: Number })
  refresh(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshToken(id, refreshToken, res);
  }
}
