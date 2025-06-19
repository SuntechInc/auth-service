import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '../../domain/users/user.repository';
import { User } from '../../domain/users/user.entity';
import { ok, err, Result } from '../../shared/result';

@Injectable()
export class GetUserUseCase {
  constructor(@Inject('UserRepository') private readonly repo: UserRepository) {}

  async execute(id: string): Promise<Result<User, string>> {
    const user = await this.repo.findById(id);
    if (!user) return err('user not found');
    return ok(user);
  }
}
