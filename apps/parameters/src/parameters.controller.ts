import { RmqService } from '@app/common';
import { Controller } from '@nestjs/common';
import { ParametersService } from './parameters.service';
import {
  EventPattern,
  Payload,
  RmqContext,
  Ctx,
  MessagePattern,
} from '@nestjs/microservices';

@Controller()
export class ParametersController {
  constructor(
    private readonly parametersService: ParametersService,
    private readonly rmqService: RmqService,
  ) {}

  @EventPattern('add_parameters')
  async addHello(@Payload() data: any, @Ctx() context: RmqContext) {
    await this.parametersService.addHello(data);
    this.rmqService.ack(context);
  }

  @MessagePattern({ cmd: 'get_parameters' })
  async getHello(@Ctx() context: RmqContext) {
    this.rmqService.ack(context);
    return await this.parametersService.getHello();
  }
}
