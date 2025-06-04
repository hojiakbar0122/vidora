import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 123, description: 'Izoh qoldirgan foydalanuvchining ID raqami' })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({ example: 456, description: 'Izoh yozilgan videoning ID raqami' })
  @IsNotEmpty()
  @IsNumber()
  videoId: number;

  @ApiProperty({ example: 'Bu video juda zo‘r!', description: 'Izoh matni' })
  @IsNotEmpty()
  @IsString()
  text: string;
}
