-- CreateTable
CREATE TABLE "roles" (
    "id_roles" TEXT NOT NULL,
    "id_company" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id_roles")
);

-- CreateTable
CREATE TABLE "user_roles" (
    "id_user" TEXT NOT NULL,
    "id_role" TEXT NOT NULL,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id_user","id_role")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_id_company_key" ON "roles"("name", "id_company");

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id_users") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "roles"("id_roles") ON DELETE RESTRICT ON UPDATE CASCADE;
