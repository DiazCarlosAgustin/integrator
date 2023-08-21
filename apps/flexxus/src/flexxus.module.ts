import { Module } from '@nestjs/common';
import { FlexxusController } from './flexxus.controller';
import { FlexxusService } from './flexxus.service';
import { RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/api-getaway/.env',
    }),
    RmqModule,
    HttpModule,
  ],
  controllers: [FlexxusController],
  providers: [FlexxusService],
})
export class FlexxusModule {}
