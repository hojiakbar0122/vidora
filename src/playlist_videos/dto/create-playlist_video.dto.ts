import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePlaylistVideoDto {
  @ApiProperty({ example: 1, description: "Playlist identifikatori" })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  playlistId: number;

  @ApiProperty({ example: 10, description: "Video identifikatori" })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  videoId: number;

  @ApiProperty({ example: 1, description: "Playlistdagi videoning pozitsiyasi" })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  position: number;
}
