import { Test, TestingModule } from '@nestjs/testing';
import { ConfidentialityController } from './confidentiality.controller';
import { ConfidentialityService } from './confidentiality.service';

describe('ConfidentialityController', () => {
  let controller: ConfidentialityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfidentialityController],
      providers: [ConfidentialityService],
    }).compile();

    controller = module.get<ConfidentialityController>(ConfidentialityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
