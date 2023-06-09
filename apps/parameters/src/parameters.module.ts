import { Module } from '@nestjs/common';
import { ParametersController } from './parameters.controller';
import { ParametersService } from './parameters.service';
import { RmqModule, DatabaseModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/api-getaway/.env',
    }),
    DatabaseModule,
    RmqModule,
  ],
  controllers: [ParametersController],
  providers: [ParametersService],
})
export class ParametersModule {}
