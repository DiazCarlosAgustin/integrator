import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
@Injectable()
export class SyncService {
  constructor(@Inject('SERVICES') private servicesClient: ClientProxy) {}
  async executeFill(serviceId): Promise<any> {
    const service = serviceId.serviceId;
    return await lastValueFrom(
      this.servicesClient.send({ cmd: 'getServiceById' }, { service }),
    );
  }
}
