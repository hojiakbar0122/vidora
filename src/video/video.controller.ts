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
import { VideoService } from "./video.service";
import { CreateVideoDto } from "./dto/create-video.dto";
import { UpdateVideoDto } from "./dto/update-video.dto";
import { JwtSelfGuard } from "../common/guards/jwt-self.guard";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

@ApiTags("videos")
@Controller("videos")
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: "Create a new video" })
  @ApiBody({ type: CreateVideoDto })
  @ApiResponse({ status: 201, description: "Video created successfully" })
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videoService.create(createVideoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: "Get all videos" })
  @ApiResponse({ status: 200, description: "List of videos" })
  findAll() {
    return this.videoService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  @ApiOperation({ summary: "Get video by id" })
  @ApiParam({ name: "id", type: Number, description: "Video ID" })
  @ApiResponse({ status: 200, description: "Video found" })
  @ApiResponse({ status: 404, description: "Video not found" })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.videoService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Update video by id" })
  @ApiParam({ name: "id", type: Number, description: "Video ID" })
  @ApiBody({ type: UpdateVideoDto })
  @ApiResponse({ status: 200, description: "Video updated successfully" })
  @ApiResponse({ status: 404, description: "Video not found" })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateVideoDto: UpdateVideoDto
  ) {
    return this.videoService.update(id, updateVideoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Delete video by id" })
  @ApiParam({ name: "id", type: Number, description: "Video ID" })
  @ApiResponse({ status: 200, description: "Video deleted successfully" })
  @ApiResponse({ status: 404, description: "Video not found" })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.videoService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id/view")
  @ApiOperation({ summary: "Increment view count for video by id" })
  @ApiParam({ name: "id", type: Number, description: "Video ID" })
  @ApiResponse({ status: 200, description: "View count incremented" })
  @ApiResponse({ status: 404, description: "Video not found" })
  async view(@Param("id", ParseIntPipe) id: number) {
    return this.videoService.viewVideo(id);
  }
}
