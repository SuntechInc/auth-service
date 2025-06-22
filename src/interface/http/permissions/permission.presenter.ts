import { Permission } from '../../../domain/permissions/permission.entity';
import { PermissionResponseDto } from './dtos/permission-response.dto';

export const permissionToDto = (perm: Permission): PermissionResponseDto => ({
  id: perm.id,
  name: perm.name,
  description: perm.description,
});
