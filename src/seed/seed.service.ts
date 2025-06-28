import { Injectable, Logger, OnModuleInit, Inject } from '@nestjs/common';
import { UserRepository, USER_REPOSITORY } from '../domain/users/user.repository';
import { User } from '../domain/users/user.entity';
import { UserStatus } from '../domain/users/user-status.enum';
import { UserType } from '../domain/users/user-type.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly users: UserRepository
  ) {}

  async onModuleInit() {
    const companyId = process.env.DEFAULT_COMPANY_ID;
    const email     = process.env.DEFAULT_ADMIN_EMAIL;
    const password  = process.env.DEFAULT_ADMIN_PASSWORD;

    if (!companyId || !email || !password) {
      this.logger.warn('Seeds não configuradas via env, pulando.');
      return;
    }

    // Verifica se já existe
    const existing = await (this.users as any).findByEmail?.(email);
    if (existing) {
      this.logger.log(`Admin '${email}' já existe, nada a fazer.`);
      return;
    }

    // Cria o admin
    const hashed = await bcrypt.hash(password, 10);
    const admin = new User(
      '', // id será gerado pelo banco
      'Admin',
      email,
      hashed,
      UserStatus.ACTIVE,
      UserType.COMPANY_ADMIN,
      new Date(),
      new Date(),
      companyId // Passar o companyId diretamente no construtor
    );

    await this.users.create(admin);

    this.logger.log(`Admin '${email}' criado para companyId=${companyId}.`);
  }
}