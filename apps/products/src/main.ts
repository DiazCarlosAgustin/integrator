import { RmqService } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { ProductsModule } from './products.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductsModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('PRODUCTS'));
  // const configService = app.get(ConfigService);
  await app.startAllMicroservices();
  // await app.listen(configService.get('PORT'));
}
bootstrap();
