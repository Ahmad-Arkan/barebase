import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserVerificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findLastByUserId(userId: number) {
    return await this.prisma.userVerification.findFirst({ where: { userId } });
  }

  async createVerify(userId: number, tokenHash: string) {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    return await this.prisma.userVerification.upsert({
      where: { userId: userId },
      update: {
        tokenHash: tokenHash,
        expiresAt: expiresAt,
        usedAt: null,
      },
      create: {
        userId: userId,
        tokenHash: tokenHash,
        expiresAt: expiresAt,
      },
    });
  }

  async findToken(token: string) {
    return await this.prisma.userVerification.findUnique({
      where: { tokenHash: token },
      include: { user: true },
    });
  }

  async deleteToken(verificationId: number, tx?: Prisma.TransactionClient) {
    const prisma = tx || this.prisma;
    return await prisma.userVerification.delete({
      where: { verificationId },
    });
  }
}
