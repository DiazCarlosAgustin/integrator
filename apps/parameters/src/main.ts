import { RmqService } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { ParametersModule } from './parameters.module';
// import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ParametersModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('PARAMETERS'));

  // const configService = app.get(ConfigService);

  await app.startAllMicroservices();
  // await app.listen(configService.get('PORT'));
}
bootstrap();
