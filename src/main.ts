import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PinoProvider } from './infrastructure/logger/pino.provider';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false });
  const logger = app.get('Logger') as ReturnType<typeof PinoProvider.useFactory>;
  app.useLogger(logger);
  await app.listen(process.env.PORT ?? 3334);
}
bootstrap();
