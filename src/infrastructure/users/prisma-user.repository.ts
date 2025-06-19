import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepository } from '../../domain/users/user.repository';
import { User } from '../../domain/users/user.entity';
import { UserMapper } from './user.mapper';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    const created = await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
    return UserMapper.toDomain(created);
  }

  async findById(id: string): Promise<User | null> {
    const found = await this.prisma.user.findUnique({
      where: { id },
      include: {
        accessLevels: { include: { level: true } },
        directPermissions: { include: { permission: true } },
      },
    });
    return found ? UserMapper.toDomain(found) : null;
  }
}
