/*
  Warnings:

  - Added the required column `method` to the `password_resets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PasswordResetType" AS ENUM ('RESET', 'CHANGE');

-- AlterTable
ALTER TABLE "password_resets" ADD COLUMN     "method" "PasswordResetType" NOT NULL;
