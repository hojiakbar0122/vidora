import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateFollowerDto {
  @ApiProperty({ example: 101, description: "Obuna bo‘layotgan foydalanuvchining ID raqami" })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  followerId: number;

  @ApiProperty({ example: 202, description: "Obuna bo‘linayotgan foydalanuvchining ID raqami" })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  followingId: number;
}
