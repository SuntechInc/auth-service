import { Role } from '../entities/role.entity';

export abstract class RoleRepository {
  abstract create(data: Partial<Role>): Promise<Role>;
  abstract findById(id: string): Promise<Role | null>;
  abstract findByName(name: string, idCompany: string): Promise<Role | null>;
  abstract update(id: string, data: Partial<Role>): Promise<Role>;
  abstract delete(id: string): Promise<void>;
  abstract list(idCompany: string): Promise<Role[]>;
  abstract assignPermission(roleId: string, permissionId: string): Promise<void>;
  abstract removePermission(roleId: string, permissionId: string): Promise<void>;
} 