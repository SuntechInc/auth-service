import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './healthz/healthz.controller';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { UsersModule } from './interface/http/users/users.module';
import { PermissionsModule } from './interface/http/permissions/permissions.module';
import { PinoProvider } from './infrastructure/logger/pino.provider';
import { AuthModule } from './interface/http/auth/auth.module';
import { SeedService } from './seed/seed.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        `.env.${process.env.NODE_ENV}`,
        `.env.local`
      ]
    }),
    PrismaModule,
    UsersModule,
    PermissionsModule,
    AuthModule,
  ],
  controllers: [HealthController],
  providers: [SeedService],
  // providers: [PinoProvider],
})
export class AppModule {}
