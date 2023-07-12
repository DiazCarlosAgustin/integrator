import { NestFactory } from '@nestjs/core';
import { CompaniesModule } from './companies.module';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(CompaniesModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('COMPANIES'));
  // await app.listen(3000);
  await app.startAllMicroservices();
}
bootstrap();
