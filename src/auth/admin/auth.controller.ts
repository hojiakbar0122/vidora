import { Body, Controller, HttpCode, Param, ParseIntPipe, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { SignInDto } from '../dto/sign-in.dto';
import { AdminAuthService } from './auth.service';
import { CookieGetter } from '../../common/decorators/cookie-getter.decorator';

@Controller('admin-auth')
export class AdminAuthController {
  constructor(private readonly authService: AdminAuthService) {}

  @HttpCode(200)
  @Post("sign-in")
  async signIn(@Body() signInAdminDto: SignInDto,
  @Res({passthrough:true}) res:Response 
  ) {
    return this.authService.signIn(signInAdminDto, res);
  }

  @HttpCode(200)
  @Post("sign-out")
  signOut(
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOut(refreshToken, res);
  }

  @HttpCode(200)
  @Post(":id/refresh")
  refresh(
    @Param("id", ParseIntPipe) id:number,
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    console.log(id);
    
    return this.authService.refreshToken(id, refreshToken, res)
  }
}
