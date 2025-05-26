-- CreateEnum
CREATE TYPE "RoleScope" AS ENUM ('COMPANY', 'SYSTEM');

-- AlterTable
ALTER TABLE "roles" ADD COLUMN     "scope" "RoleScope" NOT NULL DEFAULT 'COMPANY';
