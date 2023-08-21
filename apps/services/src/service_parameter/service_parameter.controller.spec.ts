import { Test, TestingModule } from '@nestjs/testing';
import { ServiceParameterController } from './service_parameter.controller';
import { ServiceParameterService } from './service_parameter.service';

describe('ServiceParameterController', () => {
  let controller: ServiceParameterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceParameterController],
      providers: [ServiceParameterService],
    }).compile();

    controller = module.get<ServiceParameterController>(
      ServiceParameterController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
