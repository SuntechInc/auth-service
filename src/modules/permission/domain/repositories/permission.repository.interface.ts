import { Permission } from '../entities/permission.entity';

export abstract class PermissionRepository {
  abstract create(data: Partial<Permission>): Promise<Permission>;
  abstract findById(id: string): Promise<Permission | null>;
  abstract findByName(name: string): Promise<Permission | null>;
  abstract update(id: string, data: Partial<Permission>): Promise<Permission>;
  abstract delete(id: string): Promise<void>;
  abstract list(): Promise<Permission[]>;
} 