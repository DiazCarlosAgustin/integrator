import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateServiceParameterDto } from './dto/create-service_parameter.dto';
import { UpdateServiceParameterDto } from './dto/update-service_parameter.dto';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceParametersEntity } from '@app/common';

@Injectable()
export class ServiceParameterService {
  constructor(
    @InjectRepository(ServiceParametersEntity)
    private readonly serviceParameterRepository: Repository<ServiceParametersEntity>,
  ) {}
  create(createServiceParameterDto: CreateServiceParameterDto) {
    return 'This action adds a new serviceParameter';
  }

  findAll() {
    return `This action returns all serviceParameter`;
  }

  async findOne(id: string): Promise<object | any> {
    try {
      return await this.serviceParameterRepository
        .query(`SELECT sp.id as id, p.id as parameter_id,p.name as name, sp.value as value FROM service_parameters sp
      LEFT OUTER JOIN parameters p ON sp.parameterId = p.id
      WHERE sp.serviceId = '${id}'`);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  update(id: number, updateServiceParameterDto: UpdateServiceParameterDto) {
    return `This action updates a #${id} serviceParameter`;
  }

  remove(id: number) {
    return `This action removes a #${id} serviceParameter`;
  }
}
