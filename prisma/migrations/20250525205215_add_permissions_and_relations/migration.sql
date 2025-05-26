-- CreateTable
CREATE TABLE "permissions" (
    "id_permissions" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id_permissions")
);

-- CreateTable
CREATE TABLE "role_permissions" (
    "id_role" TEXT NOT NULL,
    "id_permission" TEXT NOT NULL,

    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("id_role","id_permission")
);

-- CreateIndex
CREATE UNIQUE INDEX "permissions_name_key" ON "permissions"("name");

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "roles"("id_roles") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_id_permission_fkey" FOREIGN KEY ("id_permission") REFERENCES "permissions"("id_permissions") ON DELETE CASCADE ON UPDATE CASCADE;
