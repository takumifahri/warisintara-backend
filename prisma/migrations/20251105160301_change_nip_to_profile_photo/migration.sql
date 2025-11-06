/*
  Warnings:

  - You are about to drop the column `NIP` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "NIP",
ADD COLUMN     "profile_photo" TEXT;
