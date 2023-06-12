import { ParametersEntity, UpdateParameterDTO } from '@app/common';
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

      return result;
    } catch (error) {
      Logger.error(error.message);
      throw error.message;
    }
  }

  async getAllParameters(): Promise<ParametersEntity[] | []> {
    try {
      return await this.paramsRepository.find({});
    } catch (error) {
      Logger.error(error.message);
      throw error.message;
    }
  }

  async getOneParameter(data): Promise<ParametersEntity[] | []> {
    try {
      return await this.paramsRepository.find({
        where: { id: data.id },
      });
    } catch (error) {
      Logger.error(error.message);
      throw error.message;
    }
  }
  async updateParameter(data: UpdateParameterDTO): Promise<any> {
    try {
      return await this.paramsRepository
        .update(<string>data.id, data)
        .then((response) => {
          if (response) {
            return {
              message: 'parameters was successfully updated',
              success: true,
            };
          }
        })
        .catch((error) => {
          return { message: error.message, error: true };
        });
    } catch (error) {
      Logger.error(error.message);
      throw error.message;
    }
  }
  async deleteParameter(data): Promise<any> {
    try {
      return await this.paramsRepository
        .delete(<string>data.id)
        .then((response) => {
          if (response) {
            return {
              message: 'parameters was successfully deleted',
              success: true,
            };
          }
        })
        .catch((error) => {
          return { message: error.message, error: true };
        });
    } catch (error) {
      Logger.error(error.message);
      throw error.message;
    }
  }
}
