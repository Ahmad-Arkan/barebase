import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './repositories/users.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserSessionRepository } from './repositories/user-sessions.repository';
import { UserVerificationRepository } from './repositories/user-verifications.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  exports: [UserRepository, UserSessionRepository, UserVerificationRepository],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserRepository,
    UserSessionRepository,
    UserVerificationRepository,
    PrismaService,
  ],
})
export class UsersModule {}
