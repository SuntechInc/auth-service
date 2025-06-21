import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { PinoProvider } from './infrastructure/logger/pino.provider';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const logger = app.get('Logger');
  // app.useLogger(logger);
  await app.listen(process.env.PORT ?? 3334);
}
bootstrap();
