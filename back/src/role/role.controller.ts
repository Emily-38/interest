import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { AdminGuard, JwtGuard } from 'src/auth/guards';
import { roleDto } from './dto/role.dto';


@UseGuards(JwtGuard)
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  
  @Get('/')
  getAllRole() {
    return this.roleService.getAllRole();
  }

  @UseGuards(AdminGuard)
  @Post('/create')
  createRole(@Body()dto:roleDto){
    return this.roleService.createRole(dto)
  }

  @UseGuards(AdminGuard)
  @Patch('/update/:id')
  updateRole(@Param('id') id: string , @Body()dto:roleDto){
    return this.roleService.updateRole( id, dto)
  }

  
  @UseGuards(AdminGuard)
  @Delete('/delete/:id')
  deleteRole(@Param('id') id :string){
    return this.roleService.deleteRole(id)
  }
}
