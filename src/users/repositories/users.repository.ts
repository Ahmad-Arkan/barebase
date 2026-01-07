import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Prisma } from 'src/generated/prisma/client';
import { QueryUserDto } from '../dto/query-user.dto';

export const userSelections = {
  userId: true,
  avatar: true,
  name: true,
  email: true,
  telephone: true,
  description: true,
  passwordHash: false,
  userStatus: true,
  userRole: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: false,
};

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryUserDto) {
    const { search, email } = query;
    return await this.prisma.user.findMany({
      where: {
        deletedAt: null,
        ...(email && { email: { equals: email.toLowerCase().trim() } }),
        ...(search && { name: { contains: search, mode: 'insensitive' } }),
      },
      select: {
        ...userSelections,
      },
    });
  }

  async findById(userId: number) {
    return await this.prisma.user.findFirst({
      where: { userId, deletedAt: null },
      select: {
        ...userSelections,
      },
    });
  }

  async findFull(userId: number | undefined) {
    return await this.prisma.user.findFirst({
      where: { userId },
      select: {
        ...userSelections,
        passwordHash: true,
        deletedAt: true,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email, deletedAt: null },
      select: {
        ...userSelections,
        passwordHash: true,
        deletedAt: true,
      },
    });
  }

  async createUser(userDto: CreateUserDto) {
    return await this.prisma.user.upsert({
      where: { email: userDto.email },
      create: {
        name: userDto.name,
        email: userDto.email,
        avatar: userDto.avatar,
        userStatus: userDto.userStatus,
      },
      update: { name: userDto.name },
      select: {
        ...userSelections,
      },
    });
  }

  async verifyUser(
    userId: number,
    passwordHash: string,
    tx?: Prisma.TransactionClient,
  ) {
    const prisma = tx || this.prisma;
    return await prisma.user.update({
      where: { userId },
      data: { userStatus: 'ACTIVE', passwordHash },
    });
  }

  async updateUser(
    updateDto: Partial<UpdateUserDto>,
    userId: number,
    tx?: Prisma.TransactionClient,
  ) {
    const prisma = tx || this.prisma;
    return await prisma.user.update({
      where: { userId, deletedAt: null },
      data: updateDto,
      select: {
        ...userSelections,
      },
    });
  }

  async deleteUser(deleteDto: string, userId: number) {
    return await this.prisma.user.update({
      where: { userId, deletedAt: null },
      data: { email: deleteDto, deletedAt: new Date() },
      select: {},
    });
  }
}
