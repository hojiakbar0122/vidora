import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto, UpdateAdmninDto } from './dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { RolesGuard } from '../common/guards/roles.guard';
import { AdminLevel } from '../common/decorators/admin-level.decorator';
import { JwtSelfGuard } from '../common/guards/jwt-self.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('Admins')
@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @UseGuards(RolesGuard)
  @AdminLevel("super")
  @Post()
  @ApiOperation({ summary: 'Admin yaratish' })
  @ApiBody({ type: CreateAdminDto })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @UseGuards(RolesGuard)
  @AdminLevel("super")
  @Get()
  @ApiOperation({ summary: 'Barcha adminlarni olish' })
  findAll() {
    return this.adminsService.findAll();
  }

  @UseGuards(JwtSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha adminni olish' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id') id: string) {
    return this.adminsService.findOne(+id);
  }

  @UseGuards(JwtSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Adminni yangilash' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateAdmninDto })
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdmninDto) {
    return this.adminsService.update(+id, updateAdminDto);
  }

  @UseGuards(JwtSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Adminni o‘chirish' })
  @ApiParam({ name: 'id', type: Number })
  remove(@Param('id') id: string) {
    return this.adminsService.remove(+id);
  }
}
