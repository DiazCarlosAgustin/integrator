import { ParametersEntity } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ParametersService {
  constructor(
    @InjectRepository(ParametersEntity)
    private readonly paramsRepository: Repository<ParametersEntity>,
  ) {}
  async addNewParameter(data): Promise<ParametersEntity[] | []> {
    try {
      const newParameter = await this.paramsRepository.create(data);
      const result = await this.paramsRepository.save(newParameter);
      Logger.debug(`Se agrego correctamente ${JSON.stringify(result)}`);

      return result;
    } catch (error) {
      Logger.error(error.message);
    }
    return [];
  }

  getHello() {
    return { data: [1, 2, 3, 4, 5, 6] };
  }
}
