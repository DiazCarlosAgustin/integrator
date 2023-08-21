import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ServiceParameterService } from './service_parameter.service';
import { CreateServiceParameterDto } from './dto/create-service_parameter.dto';
import { UpdateServiceParameterDto } from './dto/update-service_parameter.dto';

@Controller()
export class ServiceParameterController {
  constructor(
    private readonly serviceParameterService: ServiceParameterService,
  ) {}

  @MessagePattern('createServiceParameter')
  create(@Payload() createServiceParameterDto: CreateServiceParameterDto) {
    return this.serviceParameterService.create(createServiceParameterDto);
  }

  @MessagePattern('findAllServiceParameter')
  findAll() {
    return this.serviceParameterService.findAll();
  }

  @MessagePattern('findOneServiceParameter')
  findOne(@Payload() id: number) {
    return this.serviceParameterService.findOne(id);
  }

  @MessagePattern('updateServiceParameter')
  update(@Payload() updateServiceParameterDto: UpdateServiceParameterDto) {
    return this.serviceParameterService.update(
      updateServiceParameterDto.id,
      updateServiceParameterDto,
    );
  }

  @MessagePattern('removeServiceParameter')
  remove(@Payload() id: number) {
    return this.serviceParameterService.remove(id);
  }
}
