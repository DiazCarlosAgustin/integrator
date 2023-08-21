import { Module } from '@nestjs/common';
import { ServiceParameterService } from './service_parameter.service';
import { ServiceParameterController } from './service_parameter.controller';

@Module({
  controllers: [ServiceParameterController],
  providers: [ServiceParameterService]
})
export class ServiceParameterModule {}
