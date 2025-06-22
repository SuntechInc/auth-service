import { Injectable, Inject } from '@nestjs/common';
import { PERMISSION_REPOSITORY, PermissionRepository } from '../../domain/permissions/permission.repository';
import { Result, ok, err } from '../../shared/result';

@Injectable()
export class RemovePermissionFromUserUseCase {
  constructor(@Inject(PERMISSION_REPOSITORY) private readonly repo: PermissionRepository) {}

  async execute(userId: string, permission: string): Promise<Result<void, string>> {
    try {
      await this.repo.removeFromUser(userId, permission);
      return ok(undefined);
    } catch (e) {
      return err('failed to remove permission');
    }
  }
}
