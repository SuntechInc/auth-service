import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UserPrismaRepository } from './repositories/prisma/user.prisma.repository';
import { UserService } from './services/user.service';
import { UsersController } from './controllers/user.controller';


@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: UserRepository,
      useClass: UserPrismaRepository,
    },
    UserService
  ],
  exports: [UserService]
})
export class UserModule {} 