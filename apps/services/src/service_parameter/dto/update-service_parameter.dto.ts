import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceParameterDto } from './create-service_parameter.dto';

export class UpdateServiceParameterDto extends PartialType(CreateServiceParameterDto) {
  id: number;
}
