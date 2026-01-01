import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { StoreRepository } from './stores.repository';
import { MemberRepository } from 'src/members/members.repository';

@Module({
  imports: [PrismaModule],
  controllers: [StoresController],
  providers: [StoresService, StoreRepository, MemberRepository, PrismaService],
})
export class StoresModule {}
