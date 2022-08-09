/*
  Warnings:

  - You are about to drop the column `type` on the `passwordResets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "passwordResets" DROP COLUMN "type";

-- DropEnum
DROP TYPE "PasswordResetTypes";
