/*
  Warnings:

  - A unique constraint covering the columns `[link]` on the table `Content` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Content" ALTER COLUMN "link" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Content_link_key" ON "Content"("link");
