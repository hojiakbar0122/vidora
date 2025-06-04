import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePlaylistDto {
  @ApiProperty({ example: 1, description: "Foydalanuvchi identifikatori" })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  userId: number;

  @ApiProperty({ example: "Sevimli videolar", description: "Playlist nomi" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: "Mening eng sevimli videolarim jamlanmasi", description: "Playlist tavsifi" })
  @IsNotEmpty()
  @IsString()
  description: string;
}
