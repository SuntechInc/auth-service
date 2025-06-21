import { PrismaClient } from '@prisma/client';
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

  console.log('Permissões seed criadas/atualizadas com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect()); 