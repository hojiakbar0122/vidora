import { ContentType } from "@prisma/client";

export class CreateContentDto {
  userId: number;
  content_type: ContentType
  contentId: number;
}
