/*
  Warnings:

  - You are about to drop the column `bannedById` on the `Banned_User` table. All the data in the column will be lost.
  - Added the required column `bannedBy` to the `Banned_User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Banned_User" DROP COLUMN "bannedById",
ADD COLUMN     "bannedBy" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Banned_User" ADD CONSTRAINT "Banned_User_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Banned_User" ADD CONSTRAINT "Banned_User_bannedBy_fkey" FOREIGN KEY ("bannedBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
