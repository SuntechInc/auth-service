import { User } from '../../../domain/users/user.entity';
import { UserResponseDto } from './dtos/user-response.dto';

export const userToDto = (user: User): UserResponseDto => ({
  id: user.id,
  name: user.name,
  email: user.email,
  status: user.status,
  type: user.type,
  accessLevels: [],
  directPermissions: [],
});
