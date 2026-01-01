import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { MemberRepository } from './members.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  exports: [MemberRepository],
  controllers: [MembersController],
  providers: [MembersService, MemberRepository, PrismaService],
})
export class MembersModule {}
