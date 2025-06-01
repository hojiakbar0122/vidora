import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { PrismaService } from "../../prisma/prisma.service";
import { Admin } from "@prisma/client";
import { SignInDto } from "../dto/sign-in.dto";

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService
  ) {}

  async generateTokens(admin: Admin) {
    const payload = {
      id: admin.id,
      email: admin.email,
      is_creator: admin.is_creator,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }


  async signIn(signInAdminDto: SignInDto, res: Response) {
    const { email, password } = signInAdminDto;

    const admin = await this.prismaService.admin.findUnique({
      where: { email },
    });
    if (!admin) {
      throw new BadRequestException("Email yoki parol xato!");
    }
    const isMatch = await bcrypt.compare(password, admin.hashed_password);
    if (!isMatch) {
      throw new BadRequestException("Email yoki parol xato!");
    }
    
    const tokens = await this.generateTokens(admin);

    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    await this.updateRefreshToken(admin.id, hashed_refresh_token);
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });
    return {
      message: "Admin signed in",
      accessToken: tokens.accessToken,
    };
  }

  async signOut(refreshToken: string, res: Response) {
    console.log(refreshToken);
    
    const adminData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });    

    if (!adminData) {
      throw new ForbiddenException("Admin not verified");
    }

    const hashed_refresh_token = null;
    await this.updateRefreshToken(
      adminData.id,
      hashed_refresh_token!
    );

    res.clearCookie("refreshToken");
    const response = {
      message: "Admin logged out successfully",
    };

    return response;
  }

  async refreshToken(adminId: number, refresh_token: string, res: Response) {
    console.log(adminId);
    
    const decodedToken = await this.jwtService.decode(refresh_token);

    if (adminId !== decodedToken["id"]) {
      throw new BadRequestException("Ruxsat etilmagan");
    }

    const admin = await this.prismaService.admin.findUnique({
      where: { id: adminId },
    });

    if (!admin || !admin.hashed_refresh_token) {
      throw new BadRequestException("Admin not found");
    }

    const tokenMatch = await bcrypt.compare(refresh_token, admin.hashed_refresh_token);

    if (!tokenMatch) {
      throw new ForbiddenException("Forbidden");
    }

    const { accessToken, refreshToken } = await this.generateTokens(admin);
    await this.updateRefreshToken(admin.id, refresh_token);

    res.cookie("refreshToken", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    const response = {
      message: "Admin refreshed",
      adminId: admin.id,
      access_token: accessToken,
    };

    return response;
  }

  async updateRefreshToken(adminId: number, refreshToken: string) {
    await this.prismaService.admin.update({
      where: { id: adminId },
      data: { hashed_refresh_token: refreshToken },
    });
  }
}
