import { Module } from '@nestjs/common';
import { ConfidentialityService } from './confidentiality.service';
import { ConfidentialityController } from './confidentiality.controller';

@Module({
  controllers: [ConfidentialityController],
  providers: [ConfidentialityService],
})
export class ConfidentialityModule {}
