/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
import { CompaniesEntity } from '../../entities/companies.entity';
import { PlatformsEntity } from '../../entities/platforms.entity';

export class createServiceDto {
  @IsNotEmpty()
  @IsString()
  company: CompaniesEntity;

  @IsNotEmpty()
  @IsString()
  origin_platform: PlatformsEntity;

  @IsNotEmpty()
  @IsString()
  destination_platform: PlatformsEntity;
}
