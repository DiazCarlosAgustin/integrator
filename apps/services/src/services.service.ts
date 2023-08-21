import { ServiceParameter } from './service_parameter/entities/service_parameter.entity';
import {
  ServicesEntity,
  createServiceDto,
  updateServiceDto,
  ServiceParametersEntity,
} from '@app/common';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceParameterService } from './service_parameter/service_parameter.service';

@Injectable()
export class ServicesService {
  constructor(
    private readonly serviceParameter: ServiceParameterService,
    @InjectRepository(ServicesEntity)
    private readonly serviceRepository: Repository<ServicesEntity>,
    @InjectRepository(ServiceParametersEntity)
    private readonly ServiceParamRepository: Repository<ServiceParametersEntity>,
  ) {}
  async create(createService: createServiceDto) {
    try {
      const service = this.serviceRepository.create(createService);
      return await this.serviceRepository.save(service);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.FAILED_DEPENDENCY);
    }
  }

  async findAll() {
    try {
      return await this.serviceRepository.find({
        relations: {
          company: true,
          destination_platform: true,
          origin_platform: true,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<any> {
    try {
      const promiseService = this.serviceRepository.find({
        where: {
          id: id,
        },
        relations: {
          company: true,
          destination_platform: true,
          origin_platform: true,
        },
      });
      const promiseServiceParameter = this.serviceParameter.findOne(id);

      /* The code `const [resultService, resultServiceParameter] = await Promise.all([promiseService,
      promiseServiceParameter]);` is using the `Promise.all()` method to wait for multiple promises
      to resolve. */
      const [resultService, resultServiceParameter] = await Promise.all([
        promiseService,
        promiseServiceParameter,
      ]);

      if (!resultService) {
        return null;
      }

      const obj = { parameters: {} };
      if (resultServiceParameter) {
        resultServiceParameter.forEach((item) => {
          const name = item.name;
          obj.parameters[name] = item;
        });
      }

      const result = { ...resultService[0], parameters: obj.parameters };

      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, updateServiceDto: updateServiceDto) {
    try {
      await this.serviceRepository.update(id, updateServiceDto);
      return await this.serviceRepository.find({
        where: { id: id },
        relations: {
          company: true,
          destination_platform: true,
          origin_platform: true,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    try {
      await this.serviceRepository.softDelete(id);
      return await this.serviceRepository.find({
        where: { id: id },
        relations: {
          company: true,
          destination_platform: true,
          origin_platform: true,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
