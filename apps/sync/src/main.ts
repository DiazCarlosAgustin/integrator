import { RmqService } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { SyncModule } from './sync.module';

async function bootstrap() {
  const app = await NestFactory.create(SyncModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('SYNC'));

  // const configService = app.get(ConfigService);

  await app.startAllMicroservices();
  // await app.listen(configService.get('PORT'));
}
bootstrap();
