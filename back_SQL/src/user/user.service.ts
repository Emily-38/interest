import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto';
import { user } from '@prisma/client';
import { EmailService } from 'src/email/email.service';
import * as argon from 'argon2';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService,
        private readonly emailService:EmailService
    ) {}

    async getAllUser() {
        return this.prisma.user.findMany({
            orderBy: {
                pseudo: 'asc',
              },
              select: {
                id: true,
                age: true,
                email:true,
                pseudo:true,
                gender:true,
                isActive:true,
                profile_image:true,
                confidentialityId:true,
                interestId:true,
                createdAt:true

              },  
        })
    }

    async getUserByPseudo(pseudo:string , user:user) {
        const existingUser= await this.prisma.user.findUnique({
            where:{
                pseudo:pseudo
            },
            select: {
                id: true,
                age: true,
                pseudo:true,
                gender:true,
                confidentialityId:true,
                profile_image: true,
                interestId:true
            }
        })
        if(!existingUser){
            throw new ForbiddenException('Cet utilisateur n\'éxiste pas')
        }
        return {...existingUser, user:user }
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

    async getCurrentUser(user:user) {

        const existingUser= this.prisma.user.findUnique({
            where:{
                id:user.id
            },
            select: {
                id: true,
                age: true,
                pseudo:true,
                gender:true,
                email:true,
                profile_image: true,
                confidentialityId:true,
                roleId:true,
                interestId:true
            }
        })
        if(!existingUser){
            throw new ForbiddenException('this user not exist')
        }
        return existingUser
          
    }

    async disabledUser(id:string){
        const existingUser = await this.prisma.user.findUnique({
            where:{id:id}
        })
        if(!existingUser){
            throw new ForbiddenException('cet utilisateur n\'existe pas')
        }
        if(!existingUser.isActive){
            return await this.prisma.user.update({
                where: {id:id},
                data: {isActive:true}
            }) 
        }else{
            return await this.prisma.user.update({
                where: {id:id},
                data: {isActive:false}
            })
        }
    }

    async updateUserAddInterest(id:string, dto:UserDto){

        const existingUser = await this.prisma.user.findUnique({
            where: { id },
            include: { interestId: true }, 
        });
       
        if(!existingUser){
            throw new ForbiddenException('this user not exist')
        }
        if(!dto.email){
            dto.email = existingUser.email
        }
        if(!dto.pseudo){
            dto.pseudo = existingUser.pseudo
        }

        const existingInterestIds = existingUser.interestId.map(interest => interest.id);
        const interestsToAdd = dto.interestId.filter(id => !existingInterestIds.includes(id));
        const interestsToRemove = existingInterestIds.filter(interestId => dto.interestId.includes(interestId));

        return this.prisma.user.update({
            where: { id },
            data: {
                ...dto,
                interestId: {
                    connect: interestsToAdd.map(interestId => ({ id: interestId })), 
                    disconnect: interestsToRemove.map(interestId => ({ id: interestId })), 
                },
            },
            select: {
                id: true,
                pseudo: true,
                interestId: true, 
            },
        });
    }

    async userSearch(query: string) {
            
        return await this.prisma.user.findMany({
         where: {
           OR: [ 
             { pseudo:{contains:query}},
           ],
         }
       });
     }

    async deleteUser(id: string){
        const existingUser= this.prisma.user.findUnique({
            where:{
                id: id
            }
        })
        if(!existingUser){
            throw new ForbiddenException('cette utilisateur n\'existe pas')
        }

        await this.prisma.followers.deleteMany({
            where: {
                followerId: id 
            }
        });
        return await this.prisma.user.delete({
            where:{
                id :id
            }
        })
    }

    async CreateToken (email:string){
        const existingUser= await this.prisma.user.findUnique({
            where:{
               email:email
            }
        })
        if(!existingUser){
            throw new ForbiddenException('Cette email n\'existe pas')
        }
        const activationToken= await argon.hash(`${email}+${existingUser.pseudo}`)
        const cleanToken= activationToken.replaceAll('/','-')
        await this.prisma.user.update({
            where:{
                id:existingUser.id
            }, 
            data:{
                token: cleanToken
            }
        })
        await this.emailService.sendForgetPassword(existingUser, cleanToken);
        return 'un email a etait envoyer a cette adresse email'
    }

    async updatePassword (token:string, password:string){
        const existingUser= await this.prisma.user.findFirst({
            where:{
               token:token
            }
        })

        if(!existingUser){
            throw new ForbiddenException('Cette email n\'existe pas')
        }

        const PasswordHash = await argon.hash(password)
        await this.prisma.user.update({
            where:{
                id: existingUser.id
            },
            data: {
                password:PasswordHash,
                token:null
            }
        })

        return 'votre mots de pas a été changer avec succes'

    }
}
