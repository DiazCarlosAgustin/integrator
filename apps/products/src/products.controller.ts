import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { RmqService } from '@app/common';
import {
  Payload,
  RmqContext,
  Ctx,
  MessagePattern,
} from '@nestjs/microservices';

@Controller()
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly rmqService: RmqService,
  ) {}

  @Get()
  getHello(): string {
    return this.productsService.getHello();
  }

  @MessagePattern({ cmd: 'set_products' })
  async addHello(@Payload() data, @Ctx() context: RmqContext) {
    this.rmqService.ack(context);
    return { data };
  }
}
