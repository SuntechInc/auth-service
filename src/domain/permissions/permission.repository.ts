import { Permission } from './permission.entity';

export const PERMISSION_REPOSITORY = Symbol('PermissionRepository');

export abstract class PermissionRepository {
  abstract findAll(): Promise<Permission[]>;
  abstract findByUserId(userId: string): Promise<Permission[]>;
  abstract addToUser(userId: string, permissionName: string): Promise<void>;
  abstract removeFromUser(userId: string, permissionName: string): Promise<void>;
}
