import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { BannedUsersService } from "./banned_users.service";
import { CreateBannedUserDto } from "./dto/create-banned_user.dto";
import { UpdateBannedUserDto } from "./dto/update-banned_user.dto";
import { RolesGuard } from "../common/guards/roles.guard";
import { AdminLevel } from "../common/decorators/admin-level.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

@ApiTags("banned-users")
@Controller("banned-users")
export class BannedUsersController {
  constructor(private readonly bannedUsersService: BannedUsersService) {}

  @UseGuards(RolesGuard)
  @AdminLevel("admin")
  @Post()
  @ApiOperation({ summary: "Create a new banned user record" })
  @ApiBody({ type: CreateBannedUserDto })
  @ApiResponse({ status: 201, description: "Banned user created successfully" })
  create(@Body() createBannedUserDto: CreateBannedUserDto) {
    return this.bannedUsersService.create(createBannedUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminLevel("admin")
  @Get()
  @ApiOperation({ summary: "Get all banned users" })
  @ApiResponse({ status: 200, description: "List of banned users" })
  findAll() {
    return this.bannedUsersService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminLevel("admin")
  @Get(":id")
  @ApiOperation({ summary: "Get banned user by id" })
  @ApiParam({ name: "id", type: Number, description: "Banned user ID" })
  @ApiResponse({ status: 200, description: "Banned user found" })
  @ApiResponse({ status: 404, description: "Banned user not found" })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.bannedUsersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminLevel("admin")
  @Patch(":id")
  @ApiOperation({ summary: "Update banned user by id" })
  @ApiParam({ name: "id", type: Number, description: "Banned user ID" })
  @ApiBody({ type: UpdateBannedUserDto })
  @ApiResponse({ status: 200, description: "Banned user updated successfully" })
  @ApiResponse({ status: 404, description: "Banned user not found" })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateBannedUserDto: UpdateBannedUserDto
  ) {
    return this.bannedUsersService.update(id, updateBannedUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminLevel("admin")
  @Delete(":id")
  @ApiOperation({ summary: "Delete banned user by id" })
  @ApiParam({ name: "id", type: Number, description: "Banned user ID" })
  @ApiResponse({ status: 200, description: "Banned user deleted successfully" })
  @ApiResponse({ status: 404, description: "Banned user not found" })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.bannedUsersService.remove(id);
  }
}
