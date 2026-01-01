import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaClient } from '@prisma/client/extension';

@Module({
  exports: [PrismaService],
  providers: [PrismaService],
})
export class PrismaModule {}
