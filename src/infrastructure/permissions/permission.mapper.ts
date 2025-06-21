import { Permission } from '../../domain/permissions/permission.entity';
import { Permission as PrismaPermission } from '@prisma/client';

export class PermissionMapper {
  static toDomain(prisma: PrismaPermission): Permission {
    return new Permission(
      prisma.id,
      prisma.name,
      prisma.description,
      prisma.createdAt,
      prisma.updatedAt,
    );
  }
}
