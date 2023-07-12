/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateParameterDTO {
  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  @IsString()
  value: string;
}
