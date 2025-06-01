import { PartialType } from "@nestjs/mapped-types";
import { CreateAdminDto } from "./create-admin.dto";

export class UpdateAdmninDto extends PartialType(CreateAdminDto) {}
