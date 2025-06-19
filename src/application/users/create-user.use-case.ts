import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '../../domain/users/user.repository';
import { User } from '../../domain/users/user.entity';
import { UserStatus } from '../../domain/users/user-status.enum';
import { UserType } from '../../domain/users/user-type.enum';
import { CreateUserInput } from './create-user.input';
import { ok, err, Result } from '../../shared/result';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserUseCase {
  constructor(@Inject('UserRepository') private readonly repo: UserRepository) {}

  async execute(data: CreateUserInput): Promise<Result<User, string>> {
    const hashed = await bcrypt.hash(data.password, 10);
    try {
      const user = new User(
        '',
        data.name,
        data.email,
        hashed,
        UserStatus.ACTIVE,
        UserType.EMPLOYEE,
        new Date(),
        new Date(),
      );
      const created = await this.repo.create(user);
      return ok(created);
    } catch (e: any) {
      return err('failed to create user');
    }
  }
}
