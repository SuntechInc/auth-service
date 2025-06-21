import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ZodValidationPipe } from '../../../shared/zod-validation.pipe';
import { LoginBodySchema, LoginDto, LogoutBodySchema, LogoutDto } from './dtos/login.dto';
import { AuthService } from '../../../application/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body(new ZodValidationPipe(LoginBodySchema)) dto: LoginDto,
  ) {
    return this.authService.login(dto, dto.idCompany);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refresh(refreshToken);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Body(new ZodValidationPipe(LogoutBodySchema)) dto: LogoutDto) {
    return this.authService.logout(dto.accessToken, dto.refreshToken);
  }

  @Post('blacklist/expired')
  @HttpCode(HttpStatus.OK)
  async clearExpiredBlacklist() {
    return this.authService.clearExpiredBlacklist();
  }
} 