-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_owner_id_fkey";

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "products"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;
