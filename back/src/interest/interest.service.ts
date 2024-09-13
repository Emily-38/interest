import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { interest } from 'schemas/interest.schema';
import { interestDto } from './dto';

@Injectable()
export class InterestService {
    constructor(
        @InjectModel(interest.name) private interestModel:Model<interest>) {}

        getAllInterest(){
            return this.interestModel.find()
        }
    
        getInterestById(id: string){
            return this.interestModel.findById(id)
        }

        createInterest(dto: interestDto){
            const newInterest= new this.interestModel(dto)
            return newInterest.save()
        }

        async updateInterest( id: string,  dto: interestDto){

            const existingInterest= await this.interestModel.findById(id)
    
            if(!existingInterest){
                throw new ForbiddenException('Interest not found')
            }
    
            return this.interestModel.findByIdAndUpdate(id,dto)
        }

        async deleteInterest( id: string){

            const existingInterest= await this.interestModel.findById(id)
    
            if(!existingInterest){
                throw new ForbiddenException('Interest not found')
            }
    
            return this.interestModel.findByIdAndDelete(id)
        }
}
