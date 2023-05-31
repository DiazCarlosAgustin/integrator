import { Controller, Get } from '@nestjs/common';
import { ApiGetawayService } from './api-getaway.service';

@Controller()
export class ApiGatewayController {
  constructor(private readonly apiGetawayService: ApiGetawayService) {}

  @Get()
  async addHello(): Promise<any> {
    return await this.apiGetawayService.addHello();
  }
  @Get('/get_all')
  async getHello(): Promise<any> {
    return await this.apiGetawayService.getHello();
  }
}
