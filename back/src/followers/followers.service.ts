import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FollowersService {
    constructor(private readonly prisma: PrismaService) {}
    
        async getAllFollowerById(id: string){
            const existingUser= await this.prisma.followers.findMany({
                where:{
                    userId: id,
                }
            });
            if(!existingUser) {
                throw new ForbiddenException('this user not exist')
            }
            return await this.prisma.followers.findMany({
                orderBy: {
                  followerId: 'asc',
                },
                select: {
                  id: true,
                  userId: true,
                  followerId:true
                },
              });
        }

        async createFollow( id:string, userId: string ){
          const existingUser= await this.prisma.user.findUnique({
            where:{
                id: id,
            }
          });
          
          if(!existingUser) {
            throw new ForbiddenException('this user not exist')
          }

          const existingFollow = await this.prisma.followers.findFirst({
            where:{
              userId:id,
              followerId: userId
            }
          })

          if(existingFollow){
            throw new ForbiddenException('this follow existing')
          }

          return await this.prisma.followers.create({
            data:{
            userId:id,
            followerId: userId
            }
          })  
        }

        async deleteFollow(id:string, userId : string){
          const existingUser= await this.prisma.user.findUnique({
            where:{
              id:id
            }
          })
          if(!existingUser) {
            throw new ForbiddenException('this user not exist')
          }

          const existingFollow= await this.prisma.followers.findFirst({
            where:{
              userId: id,
              followerId:userId
            }
          });
          if(!existingFollow) {
            throw new ForbiddenException('this follow not exist')
          }
          return await this.prisma.followers.delete({
            where:{
              id: existingFollow.id
            }
          })
        }
 }

