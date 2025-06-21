import { User } from './user.entity';

export const USER_REPOSITORY = Symbol('UserRepository');

export abstract class UserRepository {
  abstract create(user: User): Promise<User>;
  abstract findById(id: string): Promise<User | null>;
}
