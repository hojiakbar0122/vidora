import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsUrl,
  Matches,
  IsInt,
} from 'class-validator';

export class CreateVideoDto {
  @ApiProperty({
    example: 1,
    description: "Videoni yuklagan foydalanuvchi IDsi",
  })
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @ApiProperty({
    example: "Go'zal Tabiyat Manzaralari",
    description: "Video sarlavhasi",
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: "Ushbu video tog'lar, daryolar va o'rmonlar manzaralarini o'z ichiga oladi.",
    description: "Video tavsifi",
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: "https://example.com/videos/video1.mp4",
    description: "Video URL manzili",
  })
  @IsNotEmpty()
  @IsUrl()
  video_url: string;

  @ApiProperty({
    example: "https://example.com/thumbnails/thumb1.jpg",
    description: "Video uchun cover rasm (thumbnail) URL manzili",
  })
  @IsNotEmpty()
  @IsUrl()
  thumbnail_url: string;

  @ApiProperty({
    example: "00:03:45",
    description: "Video davomiyligi (soat:dakika:soniya formatida)",
  })
  @IsNotEmpty()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, {
    message: "Davomiylik soat:dakika:soniya formatida bo‘lishi kerak (HH:MM:SS)",
  })
  duration: string;
}
