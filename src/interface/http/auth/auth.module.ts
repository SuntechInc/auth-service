import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from '../../../application/auth/auth.service';
import { JwtStrategy } from '../../../application/auth/jwt.strategy';
import { LocalStrategy } from '../../../application/auth/local.strategy';
import { JwtAuthGuard } from '../../../application/auth/jwt-auth.guard';
import { PrismaUserRepository } from 'src/infrastructure/users/prisma-user.repository';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy, JwtAuthGuard, PrismaUserRepository],
  exports: [AuthService],
})
export class AuthModule {} 