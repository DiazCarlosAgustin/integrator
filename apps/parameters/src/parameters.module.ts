import { Module } from '@nestjs/common';
import { ParametersController } from './parameters.controller';
import { ParametersService } from './parameters.service';
import { RmqModule, ParametersEntity, DatabaseModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/parameters/.env',
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([ParametersEntity]),
    RmqModule,
  ],
  controllers: [ParametersController],
  providers: [ParametersService],
})
export class ParametersModule {}
