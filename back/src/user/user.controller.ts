import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards';
import { GetUser } from 'src/auth/decorator';
import { UserDto } from './dto';
import { user } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  getAllUser(){
    return this.userService.getAllUser()
  }

  @Get('/byId/:id')
  getUserById(@Param('id') id: string){
    return this.userService.getUserById(id)
  }

  @Patch('/update/add/interest')
  updateUserAddInterest(@GetUser() user: user ,@Body() dto: UserDto){
    return this.userService.updateUserAddInterest(user.id, dto)
  }
  @Patch('/update/delete/interest')
  updateUserDeleteInterest(@GetUser() user: user ,@Body() dto: UserDto){
    return this.userService.updateUserDeleteInterest(user.id, dto)
  }

}
