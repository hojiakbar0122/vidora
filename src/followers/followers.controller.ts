import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { FollowersService } from './followers.service';
import { CreateFollowerDto } from './dto/create-follower.dto';
import { UpdateFollowerDto } from './dto/update-follower.dto'; 

@ApiTags('followers')
@Controller('followers')
export class FollowersController {
  constructor(private readonly followersService: FollowersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new follower relationship' })
  @ApiBody({ type: CreateFollowerDto })
  @ApiResponse({ status: 201, description: 'Follower created successfully'})
  create(@Body() createFollowerDto: CreateFollowerDto) {
    return this.followersService.create(createFollowerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all followers' })
  @ApiResponse({ status: 200, description: 'List of followers'})
  findAll() {
    return this.followersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get follower by id' })
  @ApiParam({ name: 'id', type: Number, description: 'Follower ID' })
  @ApiResponse({ status: 200, description: 'Follower found'})
  @ApiResponse({ status: 404, description: 'Follower not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.followersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update follower by id' })
  @ApiParam({ name: 'id', type: Number, description: 'Follower ID' })
  @ApiBody({ type: UpdateFollowerDto })
  @ApiResponse({ status: 200, description: 'Follower updated successfully'})
  @ApiResponse({ status: 404, description: 'Follower not found' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateFollowerDto: UpdateFollowerDto) {
    return this.followersService.update(id, updateFollowerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete follower by id' })
  @ApiParam({ name: 'id', type: Number, description: 'Follower ID' })
  @ApiResponse({ status: 200, description: 'Follower deleted successfully' })
  @ApiResponse({ status: 404, description: 'Follower not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.followersService.remove(id);
  }
}
