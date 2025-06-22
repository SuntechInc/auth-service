-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'BLOCKED', 'DELETED');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('GLOBAL_ADMIN', 'COMPANY_ADMIN', 'EMPLOYEE');

-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('GLOBAL', 'COMPANY');

-- CreateTable
CREATE TABLE "role_scopes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "role_scopes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "access_levels" (
    "id_access_levels" TEXT NOT NULL,
    "id_company" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "role_type" "RoleType" NOT NULL DEFAULT 'COMPANY',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "access_levels_pkey" PRIMARY KEY ("id_access_levels")
);

-- CreateTable
CREATE TABLE "users" (
    "id_users" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "user_type" "UserType" NOT NULL DEFAULT 'EMPLOYEE',
    "id_company" TEXT,
    "id_branch" TEXT,
    "id_department" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id_users")
);

-- CreateTable
CREATE TABLE "user_access_levels" (
    "id_user" TEXT NOT NULL,
    "id_access_level" TEXT NOT NULL,

    CONSTRAINT "user_access_levels_pkey" PRIMARY KEY ("id_user","id_access_level")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id_permissions" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "scope_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id_permissions")
);

-- CreateTable
CREATE TABLE "role_permissions" (
    "id_access_level" TEXT NOT NULL,
    "id_permission" TEXT NOT NULL,

    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("id_access_level","id_permission")
);

-- CreateTable
CREATE TABLE "user_permissions" (
    "id_user" TEXT NOT NULL,
    "id_permission" TEXT NOT NULL,

    CONSTRAINT "user_permissions_pkey" PRIMARY KEY ("id_user","id_permission")
);

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revoked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "token_blacklist" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "token_blacklist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_sessions" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "ip" TEXT,
    "user_agent" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "revoked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "role_scopes_name_key" ON "role_scopes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "access_levels_name_id_company_key" ON "access_levels"("name", "id_company");

-- CreateIndex
CREATE INDEX "users_id_company_idx" ON "users"("id_company");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_id_company_key" ON "users"("email", "id_company");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_name_key" ON "permissions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_token_key" ON "refresh_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "token_blacklist_token_key" ON "token_blacklist"("token");

-- AddForeignKey
ALTER TABLE "user_access_levels" ADD CONSTRAINT "user_access_levels_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id_users") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_access_levels" ADD CONSTRAINT "user_access_levels_id_access_level_fkey" FOREIGN KEY ("id_access_level") REFERENCES "access_levels"("id_access_levels") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_scope_id_fkey" FOREIGN KEY ("scope_id") REFERENCES "role_scopes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_id_access_level_fkey" FOREIGN KEY ("id_access_level") REFERENCES "access_levels"("id_access_levels") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_id_permission_fkey" FOREIGN KEY ("id_permission") REFERENCES "permissions"("id_permissions") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_permissions" ADD CONSTRAINT "user_permissions_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id_users") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_permissions" ADD CONSTRAINT "user_permissions_id_permission_fkey" FOREIGN KEY ("id_permission") REFERENCES "permissions"("id_permissions") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id_users") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id_users") ON DELETE CASCADE ON UPDATE CASCADE;
