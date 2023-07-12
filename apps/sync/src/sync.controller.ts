import { Controller } from '@nestjs/common';
import { SyncService } from './sync.service';
import {
  Ctx,
  MessagePattern,
  RmqContext,
  Payload,
} from '@nestjs/microservices';

@Controller()
export class SyncController {
  rmqService: any;
  constructor(private readonly syncService: SyncService) {}

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
