import { Test, TestingModule } from '@nestjs/testing';
import { ConfidentialityService } from './confidentiality.service';

describe('ConfidentialityService', () => {
  let service: ConfidentialityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfidentialityService],
    }).compile();

    service = module.get<ConfidentialityService>(ConfidentialityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
