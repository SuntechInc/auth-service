/*
  Warnings:

  - You are about to drop the column `id_branch` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `id_department` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "id_branch",
DROP COLUMN "id_department";
