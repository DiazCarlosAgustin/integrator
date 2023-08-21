import {
  ServicesEntity,
  createServiceDto,
  updateServiceDto,
  ServiceParametersEntity,
} from '@app/common';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ServicesService {
  constructor(
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
      return await this.serviceRepository.find({
        where: {
          id: id,
        },
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

  async findParameterByService(id: string): Promise<any> {
    return await this.ServiceParamRepository
      .query(`SELECT sp.id as id, p.id as parameter_id,p.name as name, sp.value as value FROM service_parameters sp
                  LEFT OUTER JOIN parameters p ON sp.parameterId = p.id
                  WHERE sp.serviceId = '${id}'`);
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
