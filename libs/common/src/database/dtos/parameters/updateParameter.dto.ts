/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateParameterDTO {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  @IsString()
  value: string;
}
