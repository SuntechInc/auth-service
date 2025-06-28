import { Body, Controller, HttpCode, HttpStatus, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ZodValidationPipe } from '../../../shared/zod-validation.pipe';
import { LoginBodySchema, LoginDto, LogoutBodySchema, LogoutDto, SwitchCompanyBodySchema, SwitchCompanyDto } from './dtos/login.dto';
import { AuthService } from '../../../application/auth/auth.service';
import { RolesGuard } from 'src/application/auth/roles.guard';
import { Roles } from 'src/shared/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body(new ZodValidationPipe(LoginBodySchema)) dto: LoginDto,
  ) {
    console.log("Starting login");
    try {
      return this.authService.login(dto);
    } catch (error) {
      console.error("Error in login", error);
      throw new UnauthorizedException("Invalid credentials");
    }
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
  @UseGuards(RolesGuard)
  @Roles('GLOBAL_ADMIN')
  @Post('switch-company')
  @HttpCode(HttpStatus.OK)
  async switchCompany(
    @Body(new ZodValidationPipe(SwitchCompanyBodySchema)) dto: SwitchCompanyDto
  ) {
    // Decodifica o token atual para pegar o payload
    const payload: any = this.authService.decodeJwt(dto.accessToken);
    
    if (!payload) {
      throw new UnauthorizedException('Token inválido');
    }
    
    // Verifica se o usuário tem acesso à empresa solicitada
    if (!payload.companies || !payload.companies.includes(dto.companyId)) {
      throw new UnauthorizedException('Acesso negado para esta empresa');
    }
    
    // Gera novo JWT com actionCompanyId atualizado
    const newPayload = { 
      ...payload, 
      actionCompanyId: dto.companyId 
    };
    
    const newAccessToken = await this.authService.signJwt(newPayload);
    
    return { 
      accessToken: newAccessToken,
      message: `Alterado para empresa: ${dto.companyId}`
    };
  }
} 