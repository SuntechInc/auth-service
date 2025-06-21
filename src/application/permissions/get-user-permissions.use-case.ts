import { Injectable, Inject } from '@nestjs/common';
import { PermissionRepository, PERMISSION_REPOSITORY } from '../../domain/permissions/permission.repository';
import { Permission } from '../../domain/permissions/permission.entity';

@Injectable()
export class GetUserPermissionsUseCase {
  constructor(@Inject(PERMISSION_REPOSITORY) private readonly repo: PermissionRepository) {}

  execute(userId: string): Promise<Permission[]> {
    return this.repo.findByUserId(userId);
  }
}
