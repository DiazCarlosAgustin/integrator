import { Test, TestingModule } from '@nestjs/testing';
import { ServiceParameterService } from './service_parameter.service';

describe('ServiceParameterService', () => {
  let service: ServiceParameterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceParameterService],
    }).compile();

    service = module.get<ServiceParameterService>(ServiceParameterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
