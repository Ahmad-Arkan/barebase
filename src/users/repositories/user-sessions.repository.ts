import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client/extension';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserSessionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createSession(
    data: {
      userId: number;
      refreshTokenHash: string;
      expiresAt: Date;
      userAgent?: string;
      ipAddress?: string;
    },
    tx?: Prisma.TransactionClient,
  ) {
    const prisma = tx || this.prisma;
    return prisma.userSession.create({
      data: {
        userId: data.userId,
        refreshTokenHash: data.refreshTokenHash,
        expiresAt: data.expiresAt,
        userAgent: data.userAgent,
        ipAddress: data.ipAddress,
      },
    });
  }

  async findByUserId(userId: number) {
    return this.prisma.userSession.findMany({
      where: { userId },
    });
  }

  async findByRefreshToken(userId: number, refreshTokenHash: string) {
    return this.prisma.userSession.findFirst({
      where: {
        userId,
        refreshTokenHash,
      },
    });
  }

  async deleteSession(sessionId: number, tx?: Prisma.TransactionClient) {
    const prisma = tx || this.prisma;
    return prisma.userSession.delete({
      where: { sessionId },
    });
  }

  async deleteAllUserSessions(userId: number) {
    return this.prisma.userSession.deleteMany({
      where: { userId },
    });
  }
}
