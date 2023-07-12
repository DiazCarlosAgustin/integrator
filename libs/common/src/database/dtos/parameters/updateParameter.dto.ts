/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateParameterDTO {
  @IsString()
  @IsNotEmpty()
  id: string;
  
  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  @IsString()
  value: string;
}
