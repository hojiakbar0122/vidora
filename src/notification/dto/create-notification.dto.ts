import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateNotificationDto {
  @ApiProperty({ example: 1, description: 'Xabarnoma yuboriladigan foydalanuvchi ID raqami' })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  userId: number;

  @ApiProperty({ example: 101, description: 'Tegishli video ID raqami' })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  videoId: number;

  @ApiProperty({ example: 'Videongizga yangi izoh qoldirildi!', description: 'Xabarnoma matni' })
  @IsNotEmpty()
  @IsString()
  message: string;
}
