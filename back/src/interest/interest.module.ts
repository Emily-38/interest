import { Module } from '@nestjs/common';
import { InterestService } from './interest.service';
import { InterestController } from './interest.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { interest, interestSchema } from 'schemas/interest.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: interest.name,
      schema: interestSchema
    }])
  ],
  controllers: [InterestController],
  providers: [InterestService],
})
export class InterestModule {}
