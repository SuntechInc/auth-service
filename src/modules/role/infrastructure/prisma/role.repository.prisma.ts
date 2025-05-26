import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import { RoleRepository } from '../../domain/repositories/role.repository.interface';
import { Role as RoleEntity, RoleScope } from '../../domain/entities/role.entity';

@Injectable()
export class PrismaRoleRepository extends RoleRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(data: Partial<RoleEntity>): Promise<RoleEntity> {
    const created = await this.prisma.role.create({
      data: {
        name: data.name!,
        description: data.description!,
        idCompany: data.companyId!,
        scope: data.scope ?? RoleScope.COMPANY,
      },
    });

    return RoleEntity.rehydrate(
      created.id,
      created.name,
      created.description,
      created.idCompany,
      created.scope as RoleScope,
      created.createdAt,
      created.updatedAt,
    );
  }

  async update(id: string, data: Partial<RoleEntity>): Promise<RoleEntity> {
    const updated = await this.prisma.role.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        scope: data.scope,
      },
    });

    return RoleEntity.rehydrate(
      updated.id,
      updated.name,
      updated.description,
      updated.idCompany,
      updated.scope as RoleScope,
      updated.createdAt,
      updated.updatedAt,
    );
  }

  async findById(id: string): Promise<RoleEntity | null> {
    const found = await this.prisma.role.findUnique({
      where: { id },
    });

    if (!found) return null;

    return RoleEntity.rehydrate(
      found.id,
      found.name,
      found.description,
      found.idCompany,
      found.scope as RoleScope,
      found.createdAt,
      found.updatedAt,
    );
  }

  async findByName(name: string, idCompany: string): Promise<RoleEntity | null> {
    const found = await this.prisma.role.findFirst({
      where: { name, idCompany },
    });

    if (!found) return null;

    return RoleEntity.rehydrate(
      found.id,
      found.name,
      found.description,
      found.idCompany,
      found.scope as RoleScope,
      found.createdAt,
      found.updatedAt,
    );
  }

  async list(idCompany: string): Promise<RoleEntity[]> {
    const roles = await this.prisma.role.findMany({
      where: { idCompany },
    });

    return roles.map(role =>
      RoleEntity.rehydrate(
        role.id,
        role.name,
        role.description,
        role.idCompany,
        role.scope as RoleScope,
        role.createdAt,
        role.updatedAt,
      ),
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.role.delete({
      where: { id },
    });
  }

  async assignPermission(roleId: string, permissionId: string): Promise<void> {
    await this.prisma.rolePermission.create({
      data: {
        idRole: roleId,
        idPermission: permissionId,
      },
    });
  }

  async removePermission(roleId: string, permissionId: string): Promise<void> {
    await this.prisma.rolePermission.delete({
      where: {
        idRole_idPermission: {
          idRole: roleId,
          idPermission: permissionId,
        },
      },
    });
  }
} 