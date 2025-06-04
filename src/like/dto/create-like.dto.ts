import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsNotEmpty } from "class-validator";

export class CreateLikeDto {
  @ApiProperty({ example: 1, description: "Layk bosayotgan foydalanuvchining ID raqami" })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  userId: number;

  @ApiProperty({ example: 42, description: "Layk bosilgan videoning ID raqami" })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  videoId: number;
}
