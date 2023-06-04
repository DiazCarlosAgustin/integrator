import { RmqService } from '@app/common';
import { Controller, Get } from '@nestjs/common';
import { ParametersService } from './parameters.service';
import {
  Payload,
  RmqContext,
  Ctx,
  MessagePattern,
} from '@nestjs/microservices';

@Controller('parameters')
export class ParametersController {
  constructor(
    private readonly parametersService: ParametersService,
    private readonly rmqService: RmqService,
  ) {}

  @MessagePattern({ cmd: 'add_parameters' })
  async addHello(@Payload() data, @Ctx() context: RmqContext) {
    return await this.parametersService
      .addNewParameter(data)
      .then((response) => {
        this.rmqService.ack(context);
        return response;
      });
  }

  @MessagePattern({ cmd: 'get_parameters' })
  async getHello(@Ctx() context: RmqContext) {
    this.rmqService.ack(context);
    return await this.parametersService.getHello();
  }

  @Get('/get')
  async getHelloText() {
    return await this.parametersService.getHello();
  }
}
