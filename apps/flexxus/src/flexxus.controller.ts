import { Controller, Logger } from '@nestjs/common';
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

  @MessagePattern({ cmd: 'login_flexxus' })
  async login(@Payload() data, @Ctx() context: RmqContext) {
    console.log("🚀 ~ file: flexxus.controller.ts:26 ~ FlexxusController ~ login ~ data:", data);

    return await this.flexxusService
      .login(data.parameters)
      .then((result) => {
        this.rmqService.ack(context);
        return result;
      })
      .catch((error) => {
        Logger.error(error);
        return false;
      });
  }
}
