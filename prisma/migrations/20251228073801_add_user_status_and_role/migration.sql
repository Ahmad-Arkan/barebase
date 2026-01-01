-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING', 'SUSPEND');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('MEMBER', 'ADMIN', 'SUPERADMIN');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "user_role" "UserRole" NOT NULL DEFAULT 'MEMBER',
ADD COLUMN     "user_status" "UserStatus" NOT NULL DEFAULT 'PENDING';
