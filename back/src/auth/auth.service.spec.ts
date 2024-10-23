import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { authPrismaMock } from './mocks/auth.prisma.mock';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/email/email.service';
import * as argon from 'argon2';
import { ForbiddenException } from '@nestjs/common';
import { authMocks, dto, interestMock } from './mocks/auth.mock';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService,{provide: PrismaService, useValue: authPrismaMock}, JwtService, ConfigService, EmailService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService)
  });

  describe('login', () => {
    it('should return jwt and interest if email exists and password is correct', async () => {
      const hashedPassword = await argon.hash(dto.password);
      const userMock = {
        id: 1,
        email: 'test@gmail.com',
        password: hashedPassword,
        interestId:interestMock,
        isActive: true,
      };

      jest.spyOn(authPrismaMock.user, 'findUnique').mockResolvedValue(userMock);

      const result = await service.login(dto);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: dto.email },
        select: {
          id: true,
          password: true,
          isActive: true,
          interestId: true, 
        },
      });
      expect(result).toEqual(authMocks);
    })

    it('should throw an error if email does not exist', async () => {
      jest.spyOn(authPrismaMock.user, 'findUnique').mockResolvedValue(undefined)

      expect(()=>service.login(dto)).rejects.toBeInstanceOf(ForbiddenException)
      expect(()=>service.login(dto)).rejects.toEqual(new ForbiddenException('l\'email est incorrect') )
    });

    it('should throw an error if password is incorrect', async () => {
      const hashedPassword = await argon.hash('wrong_password');
      const userMock = {
        id: 1,
        email: 'test@gmail.com',
        password: hashedPassword,
        interestId:interestMock,
        isActive: true,
      };

      jest.spyOn(authPrismaMock.user, 'findUnique').mockResolvedValue(userMock)
      
      expect(()=>service.login(dto)).rejects.toBeInstanceOf(ForbiddenException)
      expect(()=>service.login(dto)).rejects.toEqual(new ForbiddenException('le mot de passe est incorrect') )
    });

    it('should throw an error if user is not active', async () => {
      const hashedPassword = await argon.hash(dto.password);
      const userMock = {
        id: 1,
        email: 'test@gmail.com',
        password: hashedPassword,
        interestId:interestMock,
        isActive: false,
      };

      jest.spyOn(authPrismaMock.user, 'findUnique').mockResolvedValue(userMock)

      expect(()=>service.login(dto)).rejects.toBeInstanceOf(ForbiddenException)
      expect(()=>service.login(dto)).rejects.toEqual(new ForbiddenException('votre compte n\'est pas activer merci de verifier vos mail') )
    });
  })
});
