import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { PinoProvider } from './infrastructure/logger/pino.provider';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.enableCors({
    origin: true,
    credentials: true,
  })
  // const logger = app.get('Logger');
  // app.useLogger(logger);

  const NODE_ENV = process.env.NODE_ENV ?? 'undefined';
  await app.listen(process.env.PORT ?? 3334);
  console.log(`➡️  NODE_ENV = ${NODE_ENV}`);
  console.log('➡️  Auth service is running on port');
}
bootstrap();
