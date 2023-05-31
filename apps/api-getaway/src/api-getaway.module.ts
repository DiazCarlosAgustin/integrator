import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiGatewayController } from './api-getaway.controller';
import { ApiGetawayService } from './api-getaway.service';
import { DatabaseModule, RmqModule } from '@app/common';
import { PARAMETERS_SERVICES } from './constants/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/api-getaway/.env',
    }),
    DatabaseModule,
    RmqModule.register({
      name: PARAMETERS_SERVICES,
    }),
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGetawayService],
})
export class ApiGetawayModule {}
