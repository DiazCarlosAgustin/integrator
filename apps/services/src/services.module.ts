import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { ConfigModule } from '@nestjs/config';
import { RmqModule, DatabaseModule } from '@app/common';
import { ServiceParameterModule } from './service_parameter/service_parameter.module';
import { ServiceParameterController } from './service_parameter/service_parameter.controller';
import { ServiceParameterService } from './service_parameter/service_parameter.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/api-getaway/.env',
    }),
    RmqModule,
    DatabaseModule,
    ServiceParameterModule,
  ],
  controllers: [ServicesController, ServiceParameterController],
  providers: [ServicesService, ServiceParameterService],
  exports: [ServicesService],
})
export class ServicesModule {}
