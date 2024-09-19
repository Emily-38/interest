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
            }
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
                confidentialityId:'c8a2e0ab-19f3-443d-8809-90c62741fc9e',
                roleId:'8f5a6b80-1781-4a8b-a5d7-d87345f431c0',
            }
        })
        return this.signToken(user.id)
    };

    async login(dto: loginDto) {
        const user = await this.prisma.user.findUnique({
            where:{
                email:dto.email
            }
        });
        if(!user){
            throw new ForbiddenException('this email does not correspond to any account')
        }
        const isValidPassword=await argon.verify(user.password, dto.password);
        if(!isValidPassword){
            throw new ForbiddenException('incorrect password')
        }
        const isValidAccount= user.isActive
        if(isValidAccount !== true ){
            throw new ForbiddenException('your account is invalid')
        }
        return this.signToken(user.id)
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
