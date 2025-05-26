import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import { PermissionRepository } from '../../domain/repositories/permission.repository.interface';
import { Permission as PermissionEntity } from '../../domain/entities/permission.entity';

@Injectable()
export class PrismaPermissionRepository extends PermissionRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(data: Partial<PermissionEntity>): Promise<PermissionEntity> {
    const created = await this.prisma.permission.create({
      data: {
        name: data.name!,
        description: data.description,
      },
    });

    return PermissionEntity.rehydrate(
      created.id,
      created.name,
      created.description,
      created.createdAt,
      created.updatedAt,
    );
  }

  async update(id: string, data: Partial<PermissionEntity>): Promise<PermissionEntity> {
    const updated = await this.prisma.permission.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
      },
    });

    return PermissionEntity.rehydrate(
      updated.id,
      updated.name,
      updated.description,
      updated.createdAt,
      updated.updatedAt,
    );
  }

  async findById(id: string): Promise<PermissionEntity | null> {
    const found = await this.prisma.permission.findUnique({
      where: { id },
    });

    if (!found) return null;

    return PermissionEntity.rehydrate(
      found.id,
      found.name,
      found.description,
      found.createdAt,
      found.updatedAt,
    );
  }

  async findByName(name: string): Promise<PermissionEntity | null> {
    const found = await this.prisma.permission.findUnique({
      where: { name },
    });

    if (!found) return null;

    return PermissionEntity.rehydrate(
      found.id,
      found.name,
      found.description,
      found.createdAt,
      found.updatedAt,
    );
  }

  async list(): Promise<PermissionEntity[]> {
    const permissions = await this.prisma.permission.findMany();

    return permissions.map(permission =>
      PermissionEntity.rehydrate(
        permission.id,
        permission.name,
        permission.description,
        permission.createdAt,
        permission.updatedAt,
      ),
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.permission.delete({
      where: { id },
    });
  }
} 