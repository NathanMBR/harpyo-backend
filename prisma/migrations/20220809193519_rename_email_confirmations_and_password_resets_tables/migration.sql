/*
  Warnings:

  - You are about to drop the `emailConfirmations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `passwordResets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "emailConfirmations" DROP CONSTRAINT "emailConfirmations_userId_fkey";

-- DropForeignKey
ALTER TABLE "passwordResets" DROP CONSTRAINT "passwordResets_userId_fkey";

-- DropTable
DROP TABLE "emailConfirmations";

-- DropTable
DROP TABLE "passwordResets";

-- CreateTable
CREATE TABLE "email_confirmations" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "token" TEXT NOT NULL,
    "confirmedAt" TIMESTAMPTZ,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "deletedAt" TIMESTAMPTZ,

    CONSTRAINT "email_confirmations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "password_resets" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "resetedAt" TIMESTAMPTZ,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "deletedAt" TIMESTAMPTZ,

    CONSTRAINT "password_resets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "email_confirmations" ADD CONSTRAINT "email_confirmations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "password_resets" ADD CONSTRAINT "password_resets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
