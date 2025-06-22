import { Controller, Get } from '@nestjs/common';
import { ListPermissionsUseCase } from '../../../application/permissions/list-permissions.use-case';
import { permissionToDto } from './permission.presenter';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly list: ListPermissionsUseCase) {}

  @Get()
  async findAll() {
    const perms = await this.list.execute();
    return perms.map(permissionToDto);
  }
}
