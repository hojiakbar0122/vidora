import { PartialType } from '@nestjs/swagger';
import { CreateSavedVideoDto } from './create-saved_video.dto';

export class UpdateSavedVideoDto extends PartialType(CreateSavedVideoDto) {}
