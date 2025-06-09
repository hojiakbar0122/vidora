import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Kategoriya nomi',
    example: 'Dasturlash',
    maxLength: 50,
  })
  @IsString({ message: 'Kategoriya nomi matn (string) bo‘lishi kerak' })
  @IsNotEmpty({ message: 'Kategoriya nomi bo‘sh bo‘lmasligi kerak' })
  @MaxLength(50, { message: 'Kategoriya nomi 50 belgidan oshmasligi kerak' })
  name: string;
}
