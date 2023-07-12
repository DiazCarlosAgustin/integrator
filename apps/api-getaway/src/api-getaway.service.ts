import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  PARAMETERS_SERVICES,
  SERVICE_SERVICES,
  SYNC_SERVICES,
} from './constants/services';
import { lastValueFrom } from 'rxjs';
import { ParametersDTO } from '@app/common';

@Injectable()
export class ApiGetawayService {
  constructor(
    @Inject(PARAMETERS_SERVICES) private parameterClient: ClientProxy,
    @Inject(SERVICE_SERVICES) private serviceClient: ClientProxy,
    @Inject(SYNC_SERVICES) private syncClient: ClientProxy,
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

  async SyncExecute(serviceId: string): Promise<any> {
    try {
      if (!serviceId) {
        throw new HttpException(
          { error: true, message: 'Parameter serviceId is required' },
          HttpStatus.PAYMENT_REQUIRED,
        );
      }
      return await lastValueFrom(
        this.syncClient.send({ cmd: 'execute_fill' }, { serviceId }),
      );
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}
