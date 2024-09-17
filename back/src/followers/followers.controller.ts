import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guards';
import { user } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('followers')
export class FollowersController {
  constructor(private readonly followersService: FollowersService) {}

  @Get('/:id')
  getAllFollowerById(@Param('id') id:string ) {
    return this.followersService.getAllFollowerById(id);
  }

  @Post('/create/:id')
  createFollow(@Param('id') id: string, @GetUser() user: user ){
    return this.followersService.createFollow(id, user.id)
  }

  @Delete('/delete/:id')
  deleteFollow(@Param('id') id:string, @GetUser() user: user ){
    return this.followersService.deleteFollow(id, user.id)
  }
}
