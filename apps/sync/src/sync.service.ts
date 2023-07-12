import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SyncService {
  async executeFill(serviceId: string): Promise<any> {
    return serviceId;
  }
}
