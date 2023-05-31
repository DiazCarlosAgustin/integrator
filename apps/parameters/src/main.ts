import { RmqService } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { ParametersModule } from './parameters.module';

async function bootstrap() {
  const app = await NestFactory.create(ParametersModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('PARAMETERS'));
  await app.startAllMicroservices();
}
bootstrap();
