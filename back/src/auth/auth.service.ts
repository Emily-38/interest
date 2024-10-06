import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { loginDto, RegisterDto } from './dto';


@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwt: JwtService,
        private readonly config:ConfigService
    ) {}

    async register(dto: RegisterDto ) {
        const existingEmail= await this.prisma.user.findUnique({
            where:{
                email: dto.email,
            },
        });
        if(existingEmail) {
            throw new ForbiddenException('this email already existing')
        }
        const existingPseudo= await this.prisma.user.findUnique({
            where:{
                pseudo: dto.pseudo,
            }
        });
        if(existingPseudo) {
            throw new ForbiddenException('this pseudo already existing')
        }
        console.log(dto)
        if( dto.confirmPassword !== dto.password){
            throw new ForbiddenException('the password is not the same')
        }

        const PasswordHash = await argon.hash(dto.password)

        const user = await this.prisma.user.create({
            data:{
                email: dto.email,
                password: PasswordHash,
                pseudo: dto.pseudo,
                gender: dto.gender,
                age: dto.age,
                confidentialityId:'b22d3b53-c8fc-4eca-a5a6-faa0bba5db6c',
                roleId:'7a6f26c0-6f87-4953-8bc1-eb923d18631c',
            }
        })
        return this.signToken(user.id)
    };

    async login(dto: loginDto) {
        const user = await this.prisma.user.findUnique({
            where:{
                email:dto.email
            },
            select:{
                id:true,
                isActive:true,
                password:true,
                interestId: true
            }
        });
        if(!user){
            throw new ForbiddenException('l\'email est incorrect')
        }
        const isValidPassword=await argon.verify(user.password, dto.password);
        if(!isValidPassword){
            throw new ForbiddenException('le mot de passe est incorrect')
        }
        const isValidAccount= user.isActive
        if(isValidAccount !== true ){
            throw new ForbiddenException('votre compte n\'est pas activer merci de verifier vos mail')
        }
        
        return{ interest:user.interestId, token: await this.signToken(user.id)} 
    }

    async signToken(userId: string): Promise<{ access_token: string }> {
        const payload= {
            sub: userId,
        };
        const secret= this.config.get('JWT_SECRET');
        const token= await this.jwt.signAsync(payload,{
            expiresIn: '30d',
            secret: secret,
        });
        return {
             access_token: token
        }
    }
        
    
}
