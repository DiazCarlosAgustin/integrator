import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { RmqService, createServiceDto } from '@app/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller('services')
export class ServicesController {
  constructor(
    private readonly rmqService: RmqService,
    private readonly servicesService: ServicesService,
  ) {}

  @Post()
  async create(@Body() createService: createServiceDto) {
    return await this.servicesService.create(createService);
  }

  @Get()
  async findAll() {
    return await this.servicesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.servicesService.findOne(id);
  }
  @MessagePattern({ cmd: 'getServiceById' })
  async getServiceById(
    @Payload() data,
    @Ctx() context: RmqContext,
  ): Promise<object> {
    const service = await this.servicesService.findOne(data.service);
    return service;
  }
  @MessagePattern({ cmd: 'getParametersByServiceId' })
  async getParametersByServiceId(
    @Payload() data,
    @Ctx() context: RmqContext,
  ): Promise<object> {
    const service = await this.servicesService.findParameterByService(
      data.service,
    );
    return service;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto) {
    return this.servicesService.update(id, updateServiceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.servicesService.remove(id);
  }
}
