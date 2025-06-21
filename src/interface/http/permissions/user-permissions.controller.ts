import { Controller, Get, Post, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { GetUserPermissionsUseCase } from '../../../application/permissions/get-user-permissions.use-case';
import { AddPermissionToUserUseCase } from '../../../application/permissions/add-permission-to-user.use-case';
import { RemovePermissionFromUserUseCase } from '../../../application/permissions/remove-permission-from-user.use-case';
import { permissionToDto } from './permission.presenter';
import { AddPermissionDto, AddPermissionBodySchema } from './dtos/add-permission.dto';
import { ZodValidationPipe } from '../../../shared/zod-validation.pipe';

@Controller('users/:id/permissions')
export class UserPermissionsController {
  constructor(
    private readonly listUser: GetUserPermissionsUseCase,
    private readonly add: AddPermissionToUserUseCase,
    private readonly remove: RemovePermissionFromUserUseCase,
  ) {}

  @Get()
  async list(@Param('id') id: string) {
    const perms = await this.listUser.execute(id);
    return perms.map(permissionToDto);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addPermission(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(AddPermissionBodySchema)) dto: AddPermissionDto,
  ) {
    const result = await this.add.execute(id, dto.permission);
    if (!result.ok) {
      return { message: result.error };
    }
    return { message: 'ok' };
  }

  @Delete(':permission')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removePermission(
    @Param('id') id: string,
    @Param('permission') permission: string,
  ) {
    const result = await this.remove.execute(id, permission);
    if (!result.ok) {
      return { message: result.error };
    }
  }
}
