import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  Matches,
  MinLength,
  IsOptional,
} from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    example: "Ali Valiyev",
    description: "Foydalanuvchining to‘liq ismi",
  })
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @ApiProperty({
    example: "ali_vali",
    description: "Unikal foydalanuvchi nomi (username)",
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: "Men hayotni sevaman",
    description: "Foydalanuvchi haqida qisqacha bio",
  })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({
    example: "https://example.com/image.jpg",
    description: "Profil rasmi URL manzili",
  })
  @IsOptional()
  @IsString()
  profile_image_url?: string;

  @ApiProperty({ example: "+998901234567", description: "Telefon raqami" })
  @IsNotEmpty()
  @Matches(/^\+998\d{9}$/, {
    message: "Telefon raqami +998 bilan boshlanishi va 9 ta raqamdan iborat bo‘lishi kerak",
  })
  phone: string;

  @ApiProperty({ example: "ali@example.com", description: "Email manzili" })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: "strongPassword123", description: "Parol" })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: "strongPassword123",
    description: "Parolni tasdiqlash",
  })
  @IsNotEmpty()
  confirm_password: string;
}
