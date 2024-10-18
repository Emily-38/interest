import { Body, Controller, Delete, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
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
  getAllUser( ){
    return this.userService.getAllUser()
  }

  @Get('/byPseudo/:pseudo')
  getUserByPseudo(@Param('pseudo') pseudo: string , @GetUser() user:user){
    return this.userService.getUserByPseudo(pseudo,user)
  }
  @Get('/byId/:id')
  getUserById(@Param('id') id: string ){
    return this.userService.getUserById(id)
  }

  @Get('/current')
  getCurrentUser(@GetUser() user:user){
    return this.userService.getCurrentUser(user)
  }

  @Get('/search')
  async globalSearch(@Query('query') query: string){ 
   return this.userService.userSearch(query)
  }

  @Patch('/update/disabled/:id')
  disabledUser(@Param('id') id:string){
    return this.userService.disabledUser(id)
  }

  @Patch('/update')
  updateUserAddInterest(@GetUser() user: user ,@Body() dto: UserDto){
    return this.userService.updateUserAddInterest(user.id, dto)
  }
  
  @Delete('/delete')
  deleteUser(@GetUser() user: user){
    return this.userService.deleteUser(user.id)
  }
}

