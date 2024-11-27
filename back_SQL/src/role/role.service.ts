import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { roleDto } from './dto/role.dto';

@Injectable()
export class RoleService {
    constructor(private readonly prisma: PrismaService,) {}

    
    async getAllRole() {
      return this.prisma.role.findMany({
        orderBy: {
          name: 'asc',
        },
        select: {
          id: true,
          name: true,
        },
      });
    }
  
    async createRole( dto: roleDto){
      const existingName= await this.prisma.role.findUnique({
          where:{
              name: dto.name,
          }
      });
      if(existingName) {
          throw new ForbiddenException('this name already existing')
      }
      return await this.prisma.role.create({
         data:{
          name:dto.name
       }
      })  
    }
  
    async updateRole(id : string , dto : roleDto){
      const existingRole= this.prisma.role.findUnique({
          where:{
              id: id
          }
      })
      if(!existingRole){
          throw new ForbiddenException('this role does not exist')
      }
      return await this.prisma.role.update({
          where:{
              id: id
          },
          data: {
              name:dto.name
          }
      })
    }
  
    async deleteRole(id: string){
      const existingRole= this.prisma.role.findUnique({
          where:{
              id: id
          }
      })
      if(!existingRole){
          throw new ForbiddenException('this role does not exist')
      }
      return await this.prisma.role.delete({
          where:{
              id :id
          }
      })
    }
}
