import { Injectable } from '@nestjs/common';
import { CreateServiceParameterDto } from './dto/create-service_parameter.dto';
import { UpdateServiceParameterDto } from './dto/update-service_parameter.dto';

@Injectable()
export class ServiceParameterService {
  create(createServiceParameterDto: CreateServiceParameterDto) {
    return 'This action adds a new serviceParameter';
  }

  findAll() {
    return `This action returns all serviceParameter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} serviceParameter`;
  }

  update(id: number, updateServiceParameterDto: UpdateServiceParameterDto) {
    return `This action updates a #${id} serviceParameter`;
  }

  remove(id: number) {
    return `This action removes a #${id} serviceParameter`;
  }
}
