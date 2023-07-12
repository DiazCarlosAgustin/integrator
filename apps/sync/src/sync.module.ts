import { Module } from '@nestjs/common';
import { SyncController } from './sync.controller';
import { SyncService } from './sync.service';
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
  controllers: [SyncController],
  providers: [SyncService],
})
export class SyncModule {}
