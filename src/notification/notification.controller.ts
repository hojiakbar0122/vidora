import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { NotificationService } from "./notification.service";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";

@ApiTags("notifications")
@Controller("notifications")
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @ApiOperation({ summary: "Yangi bildirishnoma yaratish" })
  @ApiBody({ type: CreateNotificationDto })
  @ApiResponse({
    status: 201,
    description: "Bildirishnoma muvaffaqiyatli yaratildi"
  })
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha bildirishnomalarni olish" })
  @ApiResponse({
    status: 200,
    description: "Bildirishnomalar ro'yxati"
  })
  findAll() {
    return this.notificationService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha bildirishnomani olish" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Bildirishnoma identifikatori",
  })
  @ApiResponse({
    status: 200,
    description: "Bildirishnoma topildi"
  })
  @ApiResponse({ status: 404, description: "Bildirishnoma topilmadi" })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.notificationService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "ID bo'yicha bildirishnomani yangilash" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Bildirishnoma identifikatori",
  })
  @ApiBody({ type: UpdateNotificationDto })
  @ApiResponse({
    status: 200,
    description: "Bildirishnoma muvaffaqiyatli yangilandi"
  })
  @ApiResponse({ status: 404, description: "Bildirishnoma topilmadi" })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateNotificationDto: UpdateNotificationDto
  ) {
    return this.notificationService.update(id, updateNotificationDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "ID bo'yicha bildirishnomani o'chirish" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Bildirishnoma identifikatori",
  })
  @ApiResponse({
    status: 200,
    description: "Bildirishnoma muvaffaqiyatli o'chirildi",
  })
  @ApiResponse({ status: 404, description: "Bildirishnoma topilmadi" })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.notificationService.remove(id);
  }
}
