import { UserStatus } from './user-status.enum';
import { UserType } from './user-type.enum';

export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public status: UserStatus,
    public type: UserType,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
