import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import configuration from './configs/config';

async function bootstrap() {
  const config = configuration();
  const app = await NestFactory.create(AppModule);
  await app.listen(config.port);
}
bootstrap();
