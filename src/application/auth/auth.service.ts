import { Injectable, UnauthorizedException, Inject, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaUserRepository } from '../../infrastructure/users/prisma-user.repository';
import { LoginDto } from '../../../src/interface/http/auth/dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: PrismaUserRepository,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async validateUser(email: string, password: string, idCompany: string) {
    const user = await this.userRepository.findByEmail(email, idCompany);
    if (!user) return null;
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;
    return user;
  }

  async login(dto: LoginDto, idCompany: string) {
    const user = await this.validateUser(dto.email, dto.password, idCompany);
    if (!user) throw new UnauthorizedException('Credenciais inválidas');
    const payload = { sub: user.id, email: user.email, action_companyId: idCompany };
    const accessToken = await this.jwtService.signAsync(payload);
    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 dias
    const refreshTokenRecord = await this.prisma.refreshToken.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
      },
    });
    return {
      accessToken,
      refreshToken: refreshTokenRecord.token,
      user: { id: user.id, email: user.email, name: user.name },
    };
  }

  async refresh(refreshToken: string) {
    const token = await this.prisma.refreshToken.findUnique({ where: { token: refreshToken } });
    if (!token || token.revoked || token.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh token inválido ou expirado');
    }
    const user = await this.userRepository.findById(token.userId);
    if (!user) throw new UnauthorizedException('Usuário não encontrado');
    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      accessToken,
      user: { id: user.id, email: user.email, name: user.name },
    };
  }

  async logout(accessToken: string, refreshToken: string) {
    // Revogar refresh token
    await this.prisma.refreshToken.updateMany({
      where: { token: refreshToken },
      data: { revoked: true },
    });
    // Salvar accessToken na blacklist
    const decoded: any = this.jwtService.decode(accessToken);
    const expiresAt = new Date(decoded.exp * 1000);
    await this.prisma.tokenBlacklist.create({
      data: {
        token: accessToken,
        expiresAt,
      },
    });
    return { message: 'Logout realizado com sucesso' };
  }

  async clearExpiredBlacklist() {
    const result = await this.prisma.tokenBlacklist.deleteMany({
      where: {
        expiresAt: { lt: new Date() },
      },
    });
    return { message: `Tokens expirados removidos: ${result.count}` };
  }
} 