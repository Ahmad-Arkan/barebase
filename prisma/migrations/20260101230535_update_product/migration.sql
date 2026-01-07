/*
  Warnings:

  - A unique constraint covering the columns `[store_id,sku]` on the table `products` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "products_store_id_key";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "barcode" VARCHAR(50),
ADD COLUMN     "deleted_at" TIMESTAMP(6),
ADD COLUMN     "plu" TEXT,
ADD COLUMN     "sku" TEXT;

-- CreateIndex
CREATE INDEX "products_store_id_title_idx" ON "products"("store_id", "title");

-- CreateIndex
CREATE INDEX "products_barcode_idx" ON "products"("barcode");

-- CreateIndex
CREATE INDEX "products_plu_idx" ON "products"("plu");

-- CreateIndex
CREATE UNIQUE INDEX "products_store_id_sku_key" ON "products"("store_id", "sku");
