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
        console.log(result);
        return result;
      })
      .catch((err) => {
        return { message: err.message, error: true };
      });
  }
  @Get('/get_all')
  async getHello(): Promise<any> {
    return await this.apiGetawayService.getHello();
  }
}
