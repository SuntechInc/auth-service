/*
  Warnings:

  - You are about to drop the column `scope` on the `roles` table. All the data in the column will be lost.
  - Added the required column `scopeId` to the `roles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "roles" DROP COLUMN "scope",
ADD COLUMN     "scopeId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "RoleScope";

-- CreateTable
CREATE TABLE "RoleScope" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "RoleScope_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RoleScope_name_key" ON "RoleScope"("name");

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_scopeId_fkey" FOREIGN KEY ("scopeId") REFERENCES "RoleScope"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
