/*
  Warnings:

  - A unique constraint covering the columns `[user_id,store_id]` on the table `members` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "members_user_id_store_id_key" ON "members"("user_id", "store_id");
