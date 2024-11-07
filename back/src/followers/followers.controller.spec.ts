import { Test, TestingModule } from '@nestjs/testing';
import { FollowersController } from './followers.controller';
import { FollowersService } from './followers.service';
import { user } from '@prisma/client';
import { JwtGuard } from 'src/auth/guards';


describe('FollowersController', () => {
  let controller: FollowersController;
  let followersService: FollowersService;

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

  const mockFollowersService = {
    getAllFollowerById: jest.fn(),
    createFollow: jest.fn(),
    deleteFollow: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FollowersController],
      providers: [
        { provide: FollowersService, useValue: mockFollowersService },
      ],
    })
      .overrideGuard(JwtGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<FollowersController>(FollowersController);
    followersService = module.get<FollowersService>(FollowersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllFollowerById', () => {
    it('should return all followers by ID', async () => {
      const expectedFollowers = [{ id: 'follower1' }, { id: 'follower2' }];
      mockFollowersService.getAllFollowerById.mockResolvedValue(expectedFollowers);

      const result = await controller.getAllFollowerById(mockId, mockUser);

      expect(result).toEqual(expectedFollowers);
      expect(followersService.getAllFollowerById).toHaveBeenCalledWith(mockId, mockUser);
    });
  });

  describe('createFollow', () => {
    it('should create a follow', async () => {
      const expectedFollow = { id: 'newFollowId' };
      mockFollowersService.createFollow.mockResolvedValue(expectedFollow);

      const result = await controller.createFollow(mockId, mockUser);

      expect(result).toEqual(expectedFollow);
      expect(followersService.createFollow).toHaveBeenCalledWith(mockId, mockUser.id);
    });
  });

  describe('deleteFollow', () => {
    it('should delete a follow', async () => {
      const expectedResponse = { success: true };
      mockFollowersService.deleteFollow.mockResolvedValue(expectedResponse);

      const result = await controller.deleteFollow(mockId, mockUser);

      expect(result).toEqual(expectedResponse);
      expect(followersService.deleteFollow).toHaveBeenCalledWith(mockId, mockUser.id);
    });
  });
});
