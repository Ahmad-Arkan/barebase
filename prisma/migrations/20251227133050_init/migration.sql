-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('AVAILABLE', 'PREORDER', 'UNAVAILABLE', 'ARCHIVED', 'REMOVED');

-- CreateEnum
CREATE TYPE "WeightType" AS ENUM ('RELATIVE', 'ABSOLUTE');

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "avatar" VARCHAR(255),
    "name" VARCHAR(30) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "telephone" VARCHAR(20),
    "description" VARCHAR(255),
    "password_hash" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "stores" (
    "store_id" SERIAL NOT NULL,
    "avatar" VARCHAR(255),
    "name" VARCHAR(30) NOT NULL,
    "description" VARCHAR(255),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "stores_pkey" PRIMARY KEY ("store_id")
);

-- CreateTable
CREATE TABLE "products" (
    "product_id" SERIAL NOT NULL,
    "store_id" INTEGER NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "price" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "description" VARCHAR(255),
    "stock" INTEGER NOT NULL DEFAULT 1,
    "category_id" INTEGER,
    "weightType" "WeightType" NOT NULL DEFAULT 'ABSOLUTE',
    "status" "ProductStatus" NOT NULL DEFAULT 'UNAVAILABLE',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "images" (
    "image_id" SERIAL NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "title" VARCHAR(50),
    "description" VARCHAR(255),
    "url" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("image_id")
);

-- CreateTable
CREATE TABLE "categories" (
    "category_id" SERIAL NOT NULL,
    "store_id" INTEGER NOT NULL,
    "name" VARCHAR(30) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("category_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("category_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;
