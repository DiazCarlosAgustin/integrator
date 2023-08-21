import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
/**Entities */
import { UsersEntity } from './entities/users.entity';
import { CompaniesEntity } from './entities/companies.entity';
import { ParametersEntity } from './entities/parameters.entity';
import { PlatformsEntity } from './entities/platforms.entity';
import { ServicesEntity } from './entities/services.entity';
import { ServiceParametersEntity } from './entities/serviceParameters.entity';
import { ProductEntity } from './entities/products.entity';
@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: 'localhost',
        // host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      UsersEntity,
      CompaniesEntity,
      ParametersEntity,
      PlatformsEntity,
      ServicesEntity,
      ServiceParametersEntity,
      ProductEntity,
    ]),
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
