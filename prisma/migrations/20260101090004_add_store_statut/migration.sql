-- CreateEnum
CREATE TYPE "StoreStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPEND');

-- AlterTable
ALTER TABLE "stores" ADD COLUMN     "store_status" "StoreStatus" NOT NULL DEFAULT 'ACTIVE';
