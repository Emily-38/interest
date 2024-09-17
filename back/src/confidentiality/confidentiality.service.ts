import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { confidentialityDto } from './dto/confidentiality.dto';

@Injectable()
export class ConfidentialityService {
    constructor(private readonly prisma: PrismaService,) {}

    
  async getAllConfidentiality() {
    return this.prisma.confidentiality.findMany({
      orderBy: {
        name: 'asc',
      },
      select: {
        id: true,
        name: true,
      },
    });
  }

  async createConfidentiality( dto: confidentialityDto){
    const existingName= await this.prisma.confidentiality.findUnique({
        where:{
            name: dto.name,
        }
    });
    if(existingName) {
        throw new ForbiddenException('this name already existing')
    }
    
  }

  async updateConfidentiality(id : string , dto : confidentialityDto){
    const existingConfidentiality= this.prisma.confidentiality.findUnique({
        where:{
            id: id
        }
    })
    if(!existingConfidentiality){
        throw new ForbiddenException('this confidentiality does not exist')
    }
    return await this.prisma.confidentiality.update({
        where:{
            id: id
        },
        data: {
            name:dto.name
        }
    })
  }

  async deleteConfidentiality(id: string){
    const existingConfidentiality= this.prisma.confidentiality.findUnique({
        where:{
            id: id
        }
    })
    if(!existingConfidentiality){
        throw new ForbiddenException('this confidentiality does not exist')
    }
    return await this.prisma.confidentiality.delete({
        where:{
            id :id
        }
    })
  }
}
