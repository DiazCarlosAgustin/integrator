import { RmqService } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { FlexxusModule } from './flexxus.module';

async function bootstrap() {
  const app = await NestFactory.create(FlexxusModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('FLEXXUS'));
  await app.startAllMicroservices();
}
bootstrap();
