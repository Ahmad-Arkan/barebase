/*
  Warnings:

  - You are about to drop the column `created_at` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `images` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "images_owner_id_key";

-- AlterTable
ALTER TABLE "images" DROP COLUMN "created_at",
DROP COLUMN "description",
DROP COLUMN "title",
DROP COLUMN "updated_at",
ADD COLUMN     "alt_text" VARCHAR(50),
ADD COLUMN     "thumbnail" VARCHAR(255);
