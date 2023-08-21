import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Logger,
} from '@nestjs/common';
import { ApiGetawayService } from './api-getaway.service';
import { JwtAuthGuard, ParametersDTO } from '@app/common';

@Controller()
export class ApiGatewayController {
  constructor(private readonly apiGetawayService: ApiGetawayService) {}
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  async getAllParameters(): Promise<any> {
    return await this.apiGetawayService.getAllParameters().catch((err) => {
      return { message: err.message, error: true };
    });
  }

  @Get('/sync/filltable/:serviceId')
  // @UseGuards(JwtAuthGuard)
  async runSyncFill(@Param('serviceId') serviceIde: string): Promise<any> {
    Logger.error('ENTRE');
    await this.apiGetawayService.SyncExecute(serviceIde);
    return {
      message: 'The Sync was executed successfully',
      error: false,
      status: 200,
    };
  }
}
