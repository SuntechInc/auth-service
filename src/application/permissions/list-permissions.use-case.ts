import { Injectable, Inject } from '@nestjs/common';
import { PermissionRepository, PERMISSION_REPOSITORY } from '../../domain/permissions/permission.repository';
import { Permission } from '../../domain/permissions/permission.entity';

@Injectable()
export class ListPermissionsUseCase {
  constructor(@Inject(PERMISSION_REPOSITORY) private readonly repo: PermissionRepository) {}

  execute(): Promise<Permission[]> {
    return this.repo.findAll();
  }
}
