import { Module } from '@nestjs/common';
import { SyncController } from './sync.controller';
import { SyncService } from './sync.service';
import { RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/api-getaway/.env',
    }),
    RmqModule.register({
      name: 'SERVICES',
    }),
    RmqModule.register({
      name: 'FLEXXUS',
    }),
  ],
  controllers: [SyncController],
  providers: [SyncService],
})
export class SyncModule {}
