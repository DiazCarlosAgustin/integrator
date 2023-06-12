import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiGetawayService } from './api-getaway.service';
import { ParametersDTO } from '@app/common';

@Controller()
export class ApiGatewayController {
  constructor(private readonly apiGetawayService: ApiGetawayService) {}

  @Post('/parameters/create')
  async createNewParameter(@Body() parameter: ParametersDTO): Promise<any> {
    return await this.apiGetawayService
      .createParameter(parameter)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return { message: err.message, error: true };
      });
  }
  @Get('/parameters/')
  async getAllParameters(): Promise<any> {
    return await this.apiGetawayService.getAllParameters().catch((err) => {
      return { message: err.message, error: true };
    });
  }
}
