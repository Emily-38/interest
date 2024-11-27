import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards';
import { GetUser } from 'src/auth/decorator';
import { UserDto } from './dto';
import { user } from '@prisma/client';
import { dto } from 'src/auth/mocks/auth.mock';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('/')
  getAllUser( ){
    return this.userService.getAllUser()
  }

  @UseGuards(JwtGuard)
  @Get('/byPseudo/:pseudo')
  getUserByPseudo(@Param('pseudo') pseudo: string , @GetUser() user:user){
    return this.userService.getUserByPseudo(pseudo,user)
  }

  @UseGuards(JwtGuard)
  @Get('/byId/:id')
  getUserById(@Param('id') id: string ){
    return this.userService.getUserById(id)
  }

  @UseGuards(JwtGuard)
  @Get('/current')
  getCurrentUser(@GetUser() user:user){
    return this.userService.getCurrentUser(user)
  }

  @UseGuards(JwtGuard)
  @Get('/search')
  async globalSearch(@Query('query') query: string){ 
   return this.userService.userSearch(query)
  }

  @Patch('/forget_password')
  CreateToken(@Body('email') email:string){
    return this.userService.CreateToken(email)
  }

  @Patch('/change_Password/:token')
    updatePassword(@Param('token') token: string, @Body() dto: UserDto){
      return this.userService.updatePassword(token, dto.password)
    }
  

  @UseGuards(JwtGuard)
  @Patch('/update/disabled/:id')
  disabledUser(@Param('id') id:string){
    return this.userService.disabledUser(id)
  }

  

  @UseGuards(JwtGuard)
  @Patch('/update')
  updateUserAddInterest(@GetUser() user: user ,@Body() dto: UserDto){
    return this.userService.updateUserAddInterest(user.id, dto)
  }

  @UseGuards(JwtGuard)
  @Delete('/delete')
  deleteUser(@GetUser() user: user){
    return this.userService.deleteUser(user.id)
  }
}

