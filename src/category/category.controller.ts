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
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { AdminLevel } from "../common/decorators/admin-level.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";

@ApiTags("Category")
@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminLevel("admin")
  @Post()
  @ApiOperation({ summary: "Yangi kategoriya yaratish" })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({
    status: 201,
    description: "Kategoriya muvaffaqiyatli yaratildi.",
  })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminLevel("admin")
  @Get()
  @ApiOperation({ summary: "Barcha kategoriyalarni olish" })
  @ApiResponse({ status: 200, description: "Kategoriyalar ro‘yxati." })
  findAll() {
    return this.categoryService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminLevel("admin")
  @Get(":id")
  @ApiOperation({ summary: "Bitta kategoriyani ID bo‘yicha olish" })
  @ApiParam({ name: "id", type: Number, description: "Kategoriya ID raqami" })
  @ApiResponse({ status: 200, description: "Kategoriya ma'lumotlari." })
  @ApiResponse({ status: 404, description: "Kategoriya topilmadi." })
  findOne(@Param("id") id: string) {
    return this.categoryService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminLevel("admin")
  @Patch(":id")
  @ApiOperation({ summary: "Kategoriyani yangilash" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Yangilanishi kerak bo‘lgan kategoriya ID si",
  })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({ status: 200, description: "Kategoriya yangilandi." })
  @ApiResponse({ status: 404, description: "Kategoriya topilmadi." })
  update(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminLevel("admin")
  @Delete(":id")
  @ApiOperation({ summary: "Kategoriyani o‘chirish" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "O‘chirilishi kerak bo‘lgan kategoriya ID si",
  })
  @ApiResponse({ status: 200, description: "Kategoriya o‘chirildi." })
  @ApiResponse({ status: 404, description: "Kategoriya topilmadi." })
  remove(@Param("id") id: string) {
    return this.categoryService.remove(+id);
  }
}
