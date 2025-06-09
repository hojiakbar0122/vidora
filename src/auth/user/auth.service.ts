import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  ServiceUnavailableException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { PrismaService } from "../../prisma/prisma.service";
import { User } from "@prisma/client";
import { CreateUserDto } from "../../users/dto";
import { SignInDto } from "../dto/sign-in.dto";
import { MailService } from "./mail/mail.service";

@Injectable()
export class UserAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  private readonly mailService: MailService
  ) {}

  async generateTokens(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      is_active: user.is_active,
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

  async signUp(createUserDto: CreateUserDto, res: Response) {
    const { password, confirm_password, ...values } = createUserDto;

    const candidate = await this.prismaService.user.findUnique({
      where: { email: values.email },
    });
    if (candidate) {
      throw new ConflictException("Bunday email bor");
    }
    if (password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }
    const hashed_password = await bcrypt.hash(password, 7);

    const user = await this.prismaService.user.create({
      data: { ...values, hashed_password },
    });

     try {
      await this.mailService.sendMail(user);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException("Emailga xat yuborishda xatolik");
    }

    const tokens = await this.generateTokens(user);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    await this.updateRefreshToken(user.id, hashed_refresh_token);
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });
    return {
      message: "New User signed",
      accessToken: tokens.accessToken,
    };
  }

  async signIn(signInUserDto: SignInDto, res: Response) {
    const { email, password } = signInUserDto;

    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new BadRequestException("Email yoki parol xato!");
    }
    const isMatch = await bcrypt.compare(password, user.hashed_password);
    if (!isMatch) {
      throw new BadRequestException("Email yoki parol xato!");
    }

    const tokens = await this.generateTokens(user);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    await this.updateRefreshToken(user.id, hashed_refresh_token);
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });
    return {
      message: "User signed in",
      accessToken: tokens.accessToken,
    };
  }

  async signOut(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (!userData) {
      throw new ForbiddenException("User not verified");
    }

    const hashed_refresh_token = null;
    await this.updateRefreshToken(
      userData.id,
      hashed_refresh_token!
    );

    res.clearCookie("refreshToken");
    const response = {
      message: "User logged out successfully",
    };

    return response;
  }

  async refreshToken(userId: number, refresh_token: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refresh_token);

    if (userId !== decodedToken["id"]) {
      throw new BadRequestException("Ruxsat etilmagan");
    }

    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.hashed_refresh_token) {
      throw new BadRequestException("user not found");
    }

    const tokenMatch = await bcrypt.compare(refresh_token, user.hashed_refresh_token);

    if (!tokenMatch) {
      throw new ForbiddenException("Forbidden");
    }

    const { accessToken, refreshToken } = await this.generateTokens(user);
    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await this.updateRefreshToken(user.id, hashed_refresh_token);

    res.cookie("refreshToken", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    const response = {
      message: "User refreshed",
      userId: user.id,
      access_token: accessToken,
    };

    return response;
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    await this.prismaService.user.update({
      where: { id: userId },
      data: { hashed_refresh_token: refreshToken },
    });
  }

 async activateUser(link: string) {
  console.log(link);
  
  if (!link) {
    throw new BadRequestException("Activation link not found");
  }

  const user = await this.prismaService.user.findUnique({
    where: {
      activation_link: link,
    },
  });

  if (!user) {
    throw new BadRequestException("Activation link is invalid");
  }

  if (user.is_active) {
    throw new BadRequestException("User already activated");
  }

  const updatedUser = await this.prismaService.user.update({
    where: {
      id: user.id,
    },
    data: {
      is_active: true,
    },
  });

  return {
    message: "User activated successfully",
    is_active: updatedUser.is_active,
  };
}


}
