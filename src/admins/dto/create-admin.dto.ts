import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ example: 'Ali Valiyev', description: 'To‘liq ism sharif' })
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @ApiProperty({ example: 'alivaliyev', description: 'Foydalanuvchi nomi' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'Profil rasmi URL',
    required: false,
  })
  @IsOptional()
  @IsString()
  profile_image_url: string;

  @ApiProperty({ example: '+998901234567', description: 'Telefon raqami' })
  @IsNotEmpty()
  @Matches(/^\+998\d{9}$/, { message: 'Telefon raqami +998 bilan boshlanishi kerak' })
  phone: string;

  @ApiProperty({ example: 'ali@gmail.com', description: 'Email manzil' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'StrongPass123!', description: 'Parol' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'StrongPass123!', description: 'Parolni tasdiqlash' })
  @IsNotEmpty()
  confirm_password: string;

  @ApiProperty({
    example: true,
    description: 'Agar admin yaratuvchi bo‘lsa true bo‘ladi',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  is_creater: boolean;
}
