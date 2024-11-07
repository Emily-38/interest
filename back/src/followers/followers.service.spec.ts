import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { user } from '@prisma/client';

describe('FollowersService', () => {
  let service: FollowersService;
  let prisma: PrismaService;

  const mockUser: user = {
    id: 'user1',
    email: 'testuser@example.com',
    pseudo: 'testuser',
    password: 'hashedPassword123',
    age: 25,
    gender: 'male',
    profile_image: null,
    gdpr: new Date('2023-01-01'),
    token: null,
    isActive: true,
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2023-01-01'),
    confidentialityId: 'confidentialityId1',
    roleId: 'roleId1',
  };

  const mockId = 'followerId1';

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
    },
    followers: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FollowersService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<FollowersService>(FollowersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('getAllFollowerById', () => {
    it('should return followers for a valid user', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      const expectedFollowers = [
        { id: 'follow1', userId: mockId, followerId: 'user1' },
      ];
      mockPrismaService.followers.findMany.mockResolvedValue(expectedFollowers);

      const result = await service.getAllFollowerById(mockId, mockUser);

      expect(result).toEqual({ follow: expectedFollowers, user: mockUser });
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: mockId } });
      expect(prisma.followers.findMany).toHaveBeenCalledWith({
        where: { OR: [{ userId: mockId }, { followerId: mockId }] },
        select: { id: true, userId: true, followerId: true },
      });
    });

    it('should throw a ForbiddenException if user does not exist', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.getAllFollowerById(mockId, mockUser)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe('createFollow', () => {
    it('should create a new follow if it does not exist', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaService.followers.findFirst.mockResolvedValue(null);

      const expectedFollow = { id: 'newFollowId', userId: mockId, followerId: mockUser.id };
      mockPrismaService.followers.create.mockResolvedValue(expectedFollow);

      const result = await service.createFollow(mockId, mockUser.id);

      expect(result).toEqual(expectedFollow);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: mockId } });
      expect(prisma.followers.findFirst).toHaveBeenCalledWith({
        where: { userId: mockId, followerId: mockUser.id },
      });
      expect(prisma.followers.create).toHaveBeenCalledWith({
        data: { userId: mockId, followerId: mockUser.id },
      });
    });

    it('should throw a ForbiddenException if follow already exists', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaService.followers.findFirst.mockResolvedValue({ id: 'existingFollowId' });

      await expect(service.createFollow(mockId, mockUser.id)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should throw a ForbiddenException if user does not exist', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.createFollow(mockId, mockUser.id)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe('deleteFollow', () => {
    it('should delete a follow if it exists', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      const existingFollow = { id: 'existingFollowId', userId: mockId, followerId: mockUser.id };
      mockPrismaService.followers.findFirst.mockResolvedValue(existingFollow);

      const expectedDeletion = { id: 'existingFollowId' };
      mockPrismaService.followers.delete.mockResolvedValue(expectedDeletion);

      const result = await service.deleteFollow(mockId, mockUser.id);

      expect(result).toEqual(expectedDeletion);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: mockId } });
      expect(prisma.followers.findFirst).toHaveBeenCalledWith({
        where: { userId: mockId, followerId: mockUser.id },
      });
      expect(prisma.followers.delete).toHaveBeenCalledWith({ where: { id: existingFollow.id } });
    });

    it('should throw a ForbiddenException if follow does not exist', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaService.followers.findFirst.mockResolvedValue(null);

      await expect(service.deleteFollow(mockId, mockUser.id)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should throw a ForbiddenException if user does not exist', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.deleteFollow(mockId, mockUser.id)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });
});
