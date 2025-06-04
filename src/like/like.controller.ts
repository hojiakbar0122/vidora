import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';

@ApiTags('likes')
@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new like' })
  @ApiBody({ type: CreateLikeDto })
  @ApiResponse({ status: 201, description: 'Like created successfully'})
  create(@Body() createLikeDto: CreateLikeDto) {
    return this.likeService.create(createLikeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all likes' })
  @ApiResponse({ status: 200, description: 'List of likes'})
  findAll() {
    return this.likeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get like by id' })
  @ApiParam({ name: 'id', type: Number, description: 'Like ID' })
  @ApiResponse({ status: 200, description: 'Like found'})
  @ApiResponse({ status: 404, description: 'Like not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.likeService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update like by id' })
  @ApiParam({ name: 'id', type: Number, description: 'Like ID' })
  @ApiBody({ type: UpdateLikeDto })
  @ApiResponse({ status: 200, description: 'Like updated successfully'})
  @ApiResponse({ status: 404, description: 'Like not found' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateLikeDto: UpdateLikeDto) {
    return this.likeService.update(id, updateLikeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete like by id' })
  @ApiParam({ name: 'id', type: Number, description: 'Like ID' })
  @ApiResponse({ status: 200, description: 'Like deleted successfully' })
  @ApiResponse({ status: 404, description: 'Like not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.likeService.remove(id);
  }

  @Get(':id/liked')
  @ApiOperation({ summary: 'Check if video/user is liked by id' })
  @ApiParam({ name: 'id', type: Number, description: 'ID to check liked status' })
  @ApiResponse({ status: 200, description: 'Liked status returned' })
  async liked(@Param('id', ParseIntPipe) id: number) {
    return this.likeService.liked(id);
  }
}
