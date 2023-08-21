import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiGatewayController } from './api-getaway.controller';
import { ApiGetawayService } from './api-getaway.service';
import { AuthModule, DatabaseModule, RmqModule } from '@app/common';
import {
  PARAMETERS_SERVICES,
  SYNC_SERVICES,
  SERVICE_SERVICES,
  FLEXXUS_SERVICES,
} from './constants/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/api-getaway/.env',
    }),
    DatabaseModule,
    AuthModule,
    RmqModule.register({
      name: PARAMETERS_SERVICES,
    }),
    RmqModule.register({
      name: SERVICE_SERVICES,
    }),
    RmqModule.register({
      name: SYNC_SERVICES,
    }),
    RmqModule.register({
      name: FLEXXUS_SERVICES,
    }),
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGetawayService],
})
export class ApiGetawayModule {}
