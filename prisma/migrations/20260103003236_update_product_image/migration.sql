/*
  Warnings:

  - You are about to drop the `images` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_owner_id_fkey";

-- DropTable
DROP TABLE "images";

-- CreateTable
CREATE TABLE "product_images" (
    "image_id" SERIAL NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "public_id" VARCHAR(255) NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "alt_text" VARCHAR(50),
    "thumbnail" VARCHAR(255),
    "url" VARCHAR(255) NOT NULL,

    CONSTRAINT "product_images_pkey" PRIMARY KEY ("image_id")
);

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "products"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;
