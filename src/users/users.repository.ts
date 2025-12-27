import { PrismaService } from 'src/prisma/prisma.service';

export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}
}
