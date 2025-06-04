import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBannedUserDto {
  @ApiProperty({ example: 12, description: 'Bloklangan foydalanuvchining ID raqami' })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({ example: 1, description: 'Blok qilgan adminning ID raqami' })
  @IsNotEmpty()
  @IsNumber()
  bannedBy: number;

  @ApiProperty({ example: 'Qoidabuzarlik tufayli', description: 'Bloklash sababi' })
  @IsNotEmpty()
  @IsString()
  reason: string;
}
