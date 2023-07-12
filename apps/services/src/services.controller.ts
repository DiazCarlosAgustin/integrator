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
import { createServiceDto } from '@app/common';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  async create(@Body() createService: createServiceDto) {
    return await this.servicesService.create(createService);
  }

  @Get()
  async findAll() {
    return await this.servicesService.findAll();
  }

  @Get('/executeFill/:id')
  async executeSyncProduct(@Param('id') id: string) {
    return await this.servicesService.executeFillTable(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.servicesService.findOne(id);
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
