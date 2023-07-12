import { Controller, Get } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import {
  Payload,
  RmqContext,
  Ctx,
  MessagePattern,
} from '@nestjs/microservices';
import { RmqService } from '@app/common';
@Controller()
export class CompaniesController {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly rmqService: RmqService,
  ) {}

  @Get()
  getHello(): string {
    return this.companiesService.getHello();
  }
}
