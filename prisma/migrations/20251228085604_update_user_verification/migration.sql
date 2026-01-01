/*
  Warnings:

  - You are about to drop the column `type` on the `user_verifications` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[store_id]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[owner_id]` on the table `images` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[store_id]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `user_sessions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `user_verifications` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code_hash]` on the table `user_verifications` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user_verifications" DROP COLUMN "type";

-- DropEnum
DROP TYPE "VerificationType";

-- CreateIndex
CREATE UNIQUE INDEX "categories_store_id_key" ON "categories"("store_id");

-- CreateIndex
CREATE UNIQUE INDEX "images_owner_id_key" ON "images"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "products_store_id_key" ON "products"("store_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_sessions_user_id_key" ON "user_sessions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_verifications_user_id_key" ON "user_verifications"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_verifications_code_hash_key" ON "user_verifications"("code_hash");
