import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PARAMETERS_SERVICES } from './constants/services';
import { lastValueFrom } from 'rxjs';
import { ParametersDTO } from '@app/common';

@Injectable()
export class ApiGetawayService {
  constructor(
    @Inject(PARAMETERS_SERVICES) private parameterClient: ClientProxy,
  ) {}
  async createParameter(createParameter: ParametersDTO): Promise<any> {
    try {
      return await lastValueFrom(
        this.parameterClient.send({ cmd: 'add_parameters' }, createParameter),
      );
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async getAllParameters(): Promise<any> {
    try {
      return await lastValueFrom(
        this.parameterClient.send({ cmd: 'get_parameters' }, {}),
      );
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}
