import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../infrastructure/prisma/prisma.module';
import { PermissionsController } from './permissions.controller';
import { UserPermissionsController } from './user-permissions.controller';
import { PrismaPermissionRepository } from '../../../infrastructure/permissions/prisma-permission.repository';
import { PERMISSION_REPOSITORY } from '../../../domain/permissions/permission.repository';
import { ListPermissionsUseCase } from '../../../application/permissions/list-permissions.use-case';
import { GetUserPermissionsUseCase } from '../../../application/permissions/get-user-permissions.use-case';
import { AddPermissionToUserUseCase } from '../../../application/permissions/add-permission-to-user.use-case';
import { RemovePermissionFromUserUseCase } from '../../../application/permissions/remove-permission-from-user.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [PermissionsController, UserPermissionsController],
  providers: [
    ListPermissionsUseCase,
    GetUserPermissionsUseCase,
    AddPermissionToUserUseCase,
    RemovePermissionFromUserUseCase,
    { provide: PERMISSION_REPOSITORY, useClass: PrismaPermissionRepository },
  ],
})
export class PermissionsModule {}
