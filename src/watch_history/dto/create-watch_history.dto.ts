import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Matches } from 'class-validator';

export class CreateWatchHistoryDto {
  @ApiProperty({ example: 1, description: "Foydalanuvchi IDsi" })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: 123, description: "Video IDsi" })
  @IsInt()
  @IsNotEmpty()
  videoId: number;

  @ApiProperty({ example: "00:05:30", description: "Ko'rish davomiyligi (HH:mm:ss formatida)" })
  @IsNotEmpty()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, {
    message: "Davomiylik HH:mm:ss formatida bo‘lishi kerak",
  })
  watch_duration: string;
}
