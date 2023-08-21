import { NestFactory } from '@nestjs/core';
import { ServicesModule } from './services.module';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(ServicesModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('SERVICES'));
  await app.listen(3010);
  await app.startAllMicroservices();
}
bootstrap();
