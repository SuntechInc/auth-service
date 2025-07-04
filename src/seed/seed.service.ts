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
    const adminEmail = process.env.DEFAULT_ADMIN_EMAIL;
    const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD;
    const userEmail = process.env.DEFAULT_USER_EMAIL;
    const userPassword = process.env.DEFAULT_USER_PASSWORD;

    if (!companyId || !adminEmail || !adminPassword || !userEmail || !userPassword) {
      this.logger.warn('Seeds não configuradas via env, pulando.');
      return;
    }

    // Verifica se já existe admin
    const existingAdmin = await (this.users as any).findByEmail?.(adminEmail);
    if (existingAdmin) {
      this.logger.log(`Admin '${adminEmail}' já existe, nada a fazer.`);
    } else {
      const adminHashed = await bcrypt.hash(adminPassword, 10);
      const admin = new User(
        '', 
        'Admin',
        adminEmail,
        adminHashed,
        UserStatus.ACTIVE,
        UserType.GLOBAL_ADMIN,
        new Date(),
        new Date(),
        companyId 
      );

      await this.users.create(admin);
      this.logger.log(`Admin '${adminEmail}' criado para companyId=${companyId}.`);
    }

    
    const existingUser = await (this.users as any).findByEmail?.(userEmail);
    if (existingUser) {
      this.logger.log(`Usuário '${userEmail}' já existe, nada a fazer.`);
    } else {
      const userHashed = await bcrypt.hash(userPassword, 10);
      const user = new User(
        '', 
        'Usuário',
        userEmail,
        userHashed,
        UserStatus.ACTIVE,
        UserType.EMPLOYEE,
        new Date(),
        new Date(),
        companyId 
      );

      await this.users.create(user);
      this.logger.log(`Usuário '${userEmail}' criado para companyId=${companyId}.`);
    }
  }
}