import {
  ServicesEntity,
  createServiceDto,
  updateServiceDto,
} from '@app/common';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(ServicesEntity)
    private readonly serviceRepository: Repository<ServicesEntity>,
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

  async findOne(id: string) {
    return new Promise<any>((resolve, reject) => {
      try {
        const result = this.serviceRepository.find({
          where: { id: id },
          relations: {
            company: true,
            destination_platform: true,
            origin_platform: true,
            service_parameters: {
              parameter: true,
            },
          },
        });
        resolve(result);
      } catch (error) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
        reject(error.message);
      }
    });
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

  async executeFillTable(id: string) {
    try {
      const data = await this.findOne(id);

      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
