import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto';
import { user } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService,) {}

    async getAllUser() {
        return this.prisma.user.findMany({
            orderBy: {
                pseudo: 'asc',
              },
              select: {
                id: true,
                age: true,
                pseudo:true,
                gender:true,
                profile_image: true,
                interestId:true

              },
             
        })
    }
    async getUserByPseudo(pseudo:string) {
        const existingUser= this.prisma.user.findUnique({
            where:{
                pseudo:pseudo
            },
            select: {
                id: true,
                age: true,
                pseudo:true,
                gender:true,
                profile_image: true,
                interestId:true}
        })
        if(!existingUser){
            throw new ForbiddenException('this user not exist')
        }
        return existingUser   
    }

    async getUserById(id:string) {
        const existingUser= this.prisma.user.findUnique({
            where:{
                id:id
            },
            select: {
                id: true,
                age: true,
                pseudo:true,
                gender:true,
                profile_image: true,
                interestId:true
            }
        })
        if(!existingUser){
            throw new ForbiddenException('this user not exist')
        }
        return existingUser   
    }

    async getCourentUser(user:user) {

        const existingUser= this.prisma.user.findUnique({
            where:{
                id:user.id
            },
            select: {
                id: true,
                age: true,
                pseudo:true,
                gender:true,
                profile_image: true,
                interestId:true
            }
        })
        if(!existingUser){
            throw new ForbiddenException('this user not exist')
        }
        return existingUser
          
    }

    async updateUserAddInterest(id:string, dto:UserDto){
        const existingUser=this.prisma.user.findUnique({
            where:{
                id:id
            }
        })
        if(!existingUser){
            throw new ForbiddenException('this user not exist')
        }
        return this.prisma.user.update({
            where:{id:id},
            data:{
                ...dto,
                interestId: {
                    connect: dto.interestId.map(id => ({ id })) 
                  }
            },
            select:{
                id:true,
                pseudo:true,
                interestId:true
            }
        })
    }
    async updateUserDeleteInterest(id:string, dto:UserDto){
        const existingUser=this.prisma.user.findUnique({
            where:{
                id:id
            }
        })
        if(!existingUser){
            throw new ForbiddenException('this user not exist')
        }
        
        return this.prisma.user.update({
            where:{id:id},
            data:{
                ...dto,
                interestId: {
                    disconnect: dto.interestId.map(id => ({ id })) 
                  }
            },
            select:{
                id:true,
                pseudo:true,
                interestId:true
            }
        })
    }
}
