import { User } from '../../domain/users/user.entity';
import { User as PrismaUser, UserStatus as PrismaStatus, UserType as PrismaType } from '@prisma/client';
import { UserStatus } from '../../domain/users/user-status.enum';
import { UserType } from '../../domain/users/user-type.enum';

export class UserMapper {
  static toDomain(prisma: PrismaUser): User {
    return new User(
      prisma.id,
      prisma.name,
      prisma.email,
      prisma.password,
      prisma.status as UserStatus,
      prisma.user_type as unknown as UserType,
      prisma.createdAt,
      prisma.updatedAt,
    );
  }
}
