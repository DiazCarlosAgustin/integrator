import { RmqService } from '@app/common';
import { Controller } from '@nestjs/common';
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
  async getAllParameters(@Ctx() context: RmqContext) {
    return await this.parametersService.getAllParameters().then((response) => {
      this.rmqService.ack(context);
      return response;
    });
  }

  @MessagePattern({ cmd: 'get_one__parameters' })
  async getOneParameter(@Payload() data, @Ctx() context: RmqContext) {
    return await this.parametersService
      .getOneParameter(data)
      .then((response) => {
        this.rmqService.ack(context);
        return response;
      });
  }
}
