import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { PARAMETERS_SERVICES } from './constants/services';

@Injectable()
export class ApiGetawayService {
  constructor(
    @Inject(PARAMETERS_SERVICES) private parameterClient: ClientProxy,
  ) {}
  async addHello(): Promise<any> {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    try {
      for (const key of arr) {
        console.log(
          '🚀 ~ file: api-getaway.service.ts:15 ~ ApiGetawayService ~ getHello ~ key:',
          key,
        );
        const result = await lastValueFrom(
          this.parameterClient.emit('add_parameters', key),
        );
        Logger.debug(result);
      }
    } catch (error) {
      Logger.error(error);
      throw error;
    }
    return true;
  }

  async getHello(): Promise<any> {
    try {
      return await this.parameterClient.send({ cmd: 'get_parameters' }, {});
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}
