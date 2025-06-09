import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateAdminDto, UpdateAdmninDto} from "./dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password, ...values } = createAdminDto;
    if (password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }
    const hashed_password = await bcrypt.hash(password, 7);

    return this.prismaService.admin.create({
      data: { ...values, hashed_password },
    });
  }

  findAll() {
    return this.prismaService.admin.findMany();
  }

  findOne(id: number) {
    return this.prismaService.admin.findUnique({ where: { id } });
  }

  async update(id: number, updateAdminDto: UpdateAdmninDto) {
  const { password, confirm_password, ...values } = updateAdminDto;

  // Faqat ikkala parol ham mavjud bo‘lsa
  if (password !== undefined || confirm_password !== undefined) {
    if (!password || !confirm_password) {
      throw new BadRequestException("Ikkala parol ham birga berilishi kerak");
    }

    if (password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }

    const hashed_password = await bcrypt.hash(password, 7);
    return this.prismaService.admin.update({
      where: { id },
      data: { ...values, hashed_password },
    });
  }

  // Parol yo‘q bo‘lsa, oddiy update
  return this.prismaService.admin.update({
    where: { id },
    data: values,
  });
}

  remove(id: number) {
    return this.prismaService.admin.delete({where:{id}});
  }
}
