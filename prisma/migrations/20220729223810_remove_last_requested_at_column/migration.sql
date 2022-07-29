/*
  Warnings:

  - You are about to drop the column `lastRequestedAt` on the `emailConfirmations` table. All the data in the column will be lost.
  - You are about to drop the column `lastRequestedAt` on the `passwordResets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "emailConfirmations" DROP COLUMN "lastRequestedAt";

-- AlterTable
ALTER TABLE "passwordResets" DROP COLUMN "lastRequestedAt";
