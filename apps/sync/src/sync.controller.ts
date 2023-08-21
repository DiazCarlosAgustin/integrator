import { Controller, Logger } from '@nestjs/common';
import { SyncService } from './sync.service';
import {
  Ctx,
  MessagePattern,
  RmqContext,
  Payload,
} from '@nestjs/microservices';
import { RmqService } from '@app/common';

@Controller()
export class SyncController {
  constructor(
    private readonly rmqService: RmqService,
    private readonly syncService: SyncService,
  ) {}

  @MessagePattern({ cmd: 'execute_fill' })
  async executeFill(@Payload() data, @Ctx() context: RmqContext) {
    return await this.syncService
      .executeFill(data)
      .then((response) => {
        this.rmqService.ack(context);
        return response;
      })
      .catch((err) => {
        return { error: true, message: err.message };
      });
  }
}
