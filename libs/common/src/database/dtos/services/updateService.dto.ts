/* eslint-disable prettier/prettier */
import { IsOptional, IsString } from 'class-validator';
import { CompaniesEntity } from '../../entities/companies.entity';
import { PlatformsEntity } from '../../entities/platforms.entity';

export class updateServiceDto {
  @IsOptional()
  @IsString()
  company: CompaniesEntity;

  @IsOptional()
  @IsString()
  origin_platform: PlatformsEntity;

  @IsOptional()
  @IsString()
  destination_platform: PlatformsEntity;
}
