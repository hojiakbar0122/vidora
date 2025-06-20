import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto, UpdateUserDto } from "./dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { password, confirm_password, ...values } = createUserDto;
    if (password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }
    const hashed_password = await bcrypt.hash(password, 7);

    return this.prismaService.user.create({
      data: { ...values, hashed_password },
    });
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: {
        videos: true,
        followers: true,
        followings: true,
        playlists:true,
        savedVideos:true
      },
    });

    if (!user) throw new NotFoundException("User topilmadi");

    return user;
  }

 async update(id: number, updateUserDto: UpdateUserDto) {
  const { password, confirm_password, ...values } = updateUserDto;

  // Faqat ikkala parol ham mavjud bo‘lsa
  if (password !== undefined || confirm_password !== undefined) {
    if (!password || !confirm_password) {
      throw new BadRequestException("Ikkala parol ham birga berilishi kerak");
    }

    if (password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }

    const hashed_password = await bcrypt.hash(password, 7);
    return this.prismaService.user.update({
      where: { id },
      data: { ...values, hashed_password },
    });
  }

  // Parol yo‘q bo‘lsa, oddiy update
  return this.prismaService.user.update({
    where: { id },
    data: values,
  });
}


  remove(id: number) {
    return this.prismaService.user.delete({ where: { id } });
  }
}
