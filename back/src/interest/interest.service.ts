import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { interestDto } from './dto';

@Injectable()
export class InterestService {
    constructor(private readonly prisma: PrismaService,) {}

    
    async getAllInterest() {
      return this.prisma.interest.findMany({
        orderBy: {
          name: 'asc',
        },
        select: {
          id: true,
          name: true,
        },
      });
    }

    async getInterestById(id: string) {
        return this.prisma.interest.findUnique({
          where: {
            id:id
          },
          select: {
            id: true,
            name: true,
          },
        });
      }
  
    async createInterest( dto: interestDto){
      const existingName= await this.prisma.interest.findUnique({
          where:{
              name: dto.name,
          }
      });
      if(existingName) {
          throw new ForbiddenException('this name already existing')
      }
      return this.prisma.interest.create({
        data:{
          name: dto.name
        }
      })
    }
  
    async updateInterest(id : string , dto : interestDto){
      const existingInterest= this.prisma.interest.findUnique({
          where:{
              id: id
          }
      })
      if(!existingInterest){
          throw new ForbiddenException('this interest does not exist')
      }
      return await this.prisma.interest.update({
          where:{
              id: id
          },
          data: {
              name:dto.name
          }
      })
    }
  
    async deleteInterest(id: string){
      const existingInterest= this.prisma.interest.findUnique({
          where:{
              id: id
          }
      })
      if(!existingInterest){
          throw new ForbiddenException('this interest does not exist')
      }
      return await this.prisma.interest.delete({
          where:{
              id :id
          }
      })
    }
}
