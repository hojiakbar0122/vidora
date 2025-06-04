import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AdminLevel } from "../common/decorators/admin-level.decorator";
import { RolesGuard } from "../common/guards/roles.guard";
import { JwtSelfGuard } from "../common/guards/jwt-self.guard";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: "Yangi foydalanuvchi yaratish" })
  @ApiResponse({
    status: 201,
    description: "Foydalanuvchi muvaffaqiyatli yaratildi",
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminLevel("admin")
  @Get()
  @ApiOperation({ summary: "Barcha foydalanuvchilarni olish" })
  @ApiResponse({ status: 200, description: "Foydalanuvchilar ro‘yxati" })
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha bitta foydalanuvchini olish" })
  @ApiResponse({ status: 200, description: "Foydalanuvchi topildi" })
  @ApiResponse({ status: 404, description: "Foydalanuvchi topilmadi" })
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(JwtSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Foydalanuvchi maʼlumotlarini yangilash" })
  @ApiResponse({ status: 200, description: "Foydalanuvchi yangilandi" })
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(JwtSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Foydalanuvchini o‘chirish" })
  @ApiResponse({ status: 200, description: "Foydalanuvchi o‘chirildi" })
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
