import { PrismaClient } from '@prisma/client/extension';
import * as bcrypt from 'bcryptjs';
import { MemberRole, MemberStatus } from 'src/generated/prisma/enums';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@mail.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@mail.com',
      password: bcrypt.hashSync('admin123', 10),
      role: 'SUPERADMIN',
    },
  });

  const user = await prisma.user.upsert({
    where: { email: 'user@mail.com' },
    update: {},
    create: {
      name: 'Regular User',
      email: 'user@mail.com',
      password: bcrypt.hashSync('user123', 10),
      role: 'USER',
    },
  });

  const store1 = await prisma.store.upsert({
    where: { storeId: 1 },
    update: {},
    create: {
      ownerId: admin.userId,
      name: 'First Demo Store',
      description: 'This is a first demo store',
    },
  });

  const store2 = await prisma.store.upsert({
    where: { storeId: 2 },
    update: {},
    create: {
      ownerId: admin.userId,
      name: 'Second Demo Store',
      description: 'This is a second demo store',
    },
  });

  await prisma.member.upsert({
    where: {
      userId_storeId: { userId: admin.userId, storeId: store1.storeId },
    },
    update: {},
    create: {
      userId: admin.userId,
      storeId: store1.storeId,
      role: MemberRole.OWNER,
      status: MemberStatus.ACTIVE,
    },
  });
  await prisma.member.upsert({
    where: {
      userId_storeId: { userId: user.userId, storeId: store1.storeId },
    },
    update: {},
    create: {
      userId: user.userId,
      storeId: store1.storeId,
      role: MemberRole.MANAGER,
      status: MemberStatus.ACTIVE,
    },
  });

  await prisma.member.upsert({
    where: {
      userId_storeId: { userId: admin.userId, storeId: store2.storeId },
    },
    update: {},
    create: {
      userId: user.userId,
      storeId: store2.storeId,
      role: MemberRole.OWNER,
      status: MemberStatus.ACTIVE,
    },
  });
  await prisma.member.upsert({
    where: {
      userId_storeId: { userId: admin.userId, storeId: store2.storeId },
    },
    update: {},
    create: {
      userId: admin.userId,
      storeId: store2.storeId,
      role: MemberRole.MANAGER,
      status: MemberStatus.ACTIVE,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
