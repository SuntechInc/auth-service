import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PermissionRepository } from '../../domain/permissions/permission.repository';
import { Permission } from '../../domain/permissions/permission.entity';
import { PermissionMapper } from './permission.mapper';

@Injectable()
export class PrismaPermissionRepository implements PermissionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Permission[]> {
    const perms = await this.prisma.permission.findMany();
    return perms.map(PermissionMapper.toDomain);
  }

  async findByUserId(userId: string): Promise<Permission[]> {
    const userPerms = await this.prisma.userPermission.findMany({
      where: { idUser: userId },
      include: { permission: true },
    });
    return userPerms.map((up) => PermissionMapper.toDomain(up.permission));
  }

  async addToUser(userId: string, permissionName: string): Promise<void> {
    const perm = await this.prisma.permission.findUnique({ where: { name: permissionName } });
    if (!perm) throw new Error('permission not found');
    await this.prisma.userPermission.create({
      data: { idUser: userId, idPermission: perm.id },
    });
  }

  async removeFromUser(userId: string, permissionName: string): Promise<void> {
    const perm = await this.prisma.permission.findUnique({ where: { name: permissionName } });
    if (!perm) return;
    await this.prisma.userPermission.delete({
      where: { idUser_idPermission: { idUser: userId, idPermission: perm.id } },
    });
  }
}
