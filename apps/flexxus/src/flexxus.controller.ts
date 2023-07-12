import { Controller, Get } from '@nestjs/common';
import { RmqService } from '@app/common';
import { FlexxusService } from './flexxus.service';
import {
  Payload,
  RmqContext,
  Ctx,
  MessagePattern,
} from '@nestjs/microservices';

@Controller()
export class FlexxusController {
  constructor(
    private readonly flexxusService: FlexxusService,
    private readonly rmqService: RmqService,
  ) {}

  @MessagePattern({ cmd: 'get_all_products' })
  async addHello(@Payload() data, @Ctx() context: RmqContext) {
    this.rmqService.ack(context);
    return data;
  }
}
