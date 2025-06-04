/*
  Warnings:

  - You are about to drop the column `notification_text` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `message` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "notification_text",
ADD COLUMN     "message" TEXT NOT NULL;
