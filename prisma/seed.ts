import { PrismaClient, UserType, UserStatus } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  // Substitua pelo ID real do escopo (scope) ou crie um escopo padrão antes
  const defaultScope = await prisma.roleScope.upsert({
    where: { name: 'Usuários' },
    update: {},
    create: { name: 'Usuários' },
  });

  const permissions = [
    { name: 'view_users', description: 'Visualizar usuários', scopeId: defaultScope.id },
    { name: 'create_users', description: 'Criar usuários', scopeId: defaultScope.id },
    { name: 'update_users', description: 'Atualizar usuários', scopeId: defaultScope.id },
    { name: 'delete_users', description: 'Deletar usuários', scopeId: defaultScope.id },
    // Adicione outras permissões conforme necessário
  ];

  for (const perm of permissions) {
    await prisma.permission.upsert({
      where: { name: perm.name },
      update: {},
      create: perm,
    });
  }

  // Seed do Global Admin
  const email = process.env.GLOBAL_ADMIN_EMAIL;
  const pass  = process.env.GLOBAL_ADMIN_PASSWORD;
  const idCompany = process.env.GLOBAL_ADMIN_COMPANY_ID;
  if (email && pass && idCompany) {
    const hash  = await bcrypt.hash(pass, 12);
    await prisma.user.upsert({
      where: { email_idCompany: { email, idCompany } },
      update: {
        password: hash,
        status: UserStatus.ACTIVE,
        type: UserType.GLOBAL_ADMIN,
      },
      create: {
        name: 'SaaS Admin',
        email,
        password: hash,
        status: UserStatus.ACTIVE,
        type: UserType.GLOBAL_ADMIN,
        idCompany,
      },
    });
    console.log('✅ Global Admin seed concluído:', email, 'company:', idCompany);
  } else {
    console.log('⚠️  Variáveis GLOBAL_ADMIN_EMAIL, GLOBAL_ADMIN_PASSWORD ou GLOBAL_ADMIN_COMPANY_ID não definidas. Global Admin não criado.');
  }

  console.log('Permissões seed criadas/atualizadas com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect()); 