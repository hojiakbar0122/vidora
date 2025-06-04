import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSavedVideoDto {
  @ApiProperty({ example: 123, description: "Foydalanuvchi IDsi" })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  userId: number;

  @ApiProperty({ example: 456, description: "Saqlangan video IDsi" })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  videoId: number;
}
