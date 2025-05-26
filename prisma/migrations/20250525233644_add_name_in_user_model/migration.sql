/*
  Warnings:

  - A unique constraint covering the columns `[name,email,id_company]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "UserStatus" ADD VALUE 'DELETED';

-- DropIndex
DROP INDEX "users_email_id_company_key";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_name_email_id_company_key" ON "users"("name", "email", "id_company");
