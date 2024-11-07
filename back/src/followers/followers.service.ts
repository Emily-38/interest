import { ForbiddenException, Injectable } from '@nestjs/common';
import { user } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FollowersService {
    constructor(private readonly prisma: PrismaService) {}
    
        async getAllFollowerById(id: string, user:user){
            const existingUser= await this.prisma.user.findUnique({
                where:{
                  id:id
                }
            });
            if(!existingUser) {
                throw new ForbiddenException('user doesn\'t exist')
            }
            const follow = await this.prisma.followers.findMany({
                where:{
                  OR:[ 
                    {userId:id},
                    {followerId:id}
                  ]
                },
                select: {
                  id: true,
                  userId: true,
                  followerId:true
                },
              });
              return {follow,user }
        }

        async createFollow( id:string, userId: string ){
          const existingUser= await this.prisma.user.findUnique({
            where:{
                id: id,
            }
          });
          
          if(!existingUser) {
            throw new ForbiddenException('user doesn\'t exist')
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

