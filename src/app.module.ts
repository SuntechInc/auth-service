import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './healthz/healthz.controller';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { UsersModule } from './interface/http/users/users.module';
import { PinoProvider } from './infrastructure/logger/pino.provider';


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
  ],
  controllers: [HealthController],
  providers: [PinoProvider],
})
export class AppModule {}
