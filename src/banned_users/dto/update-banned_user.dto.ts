import { PartialType } from '@nestjs/swagger';
import { CreateBannedUserDto } from './create-banned_user.dto';

export class UpdateBannedUserDto extends PartialType(CreateBannedUserDto) {}
