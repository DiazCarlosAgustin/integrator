import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, map } from 'rxjs';
@Injectable()
export class SyncService {
  constructor(
    @Inject('SERVICES') private servicesClient: ClientProxy,
    @Inject('FLEXXUS') private flexxusClient: ClientProxy,
  ) {}
  async executeFill(serviceId): Promise<any> {
    const service = serviceId.serviceId;
    let result_service = await lastValueFrom(
      this.servicesClient.send({ cmd: 'getServiceById' }, { service }),
    ).then((result) => result[0]);

    if (!result_service) {
      throw new Error('This service does not exist or not have parameters');
    }

    const parameters = await lastValueFrom(
      this.servicesClient.send(
        { cmd: 'getParametersByServiceId' },
        { service },
      ),
    ).then((result) => result);

    const obj_params = { parameters };

    if (parameters) {
      parameters.forEach((item) => {
        const name = item.name;
        obj_params.parameters[name] = item;
      });
    }
    result_service = { ...result_service, parameters: obj_params.parameters };

    const result_login_flexxus = await lastValueFrom(
      this.flexxusClient.send(
        { cmd: 'login_flexxus' },
        { parameters: result_service },
      ),
    );

    return result_login_flexxus;
  }
}
