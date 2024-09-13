import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ConfidentialityService } from './confidentiality.service';
import { AdminGuard, JwtGuard } from 'src/auth/guards';
import { confidentialityDto } from './dto/confidentiality.dto';

@UseGuards(JwtGuard)
@Controller('confidentiality')
export class ConfidentialityController {
  constructor(private readonly confidentialityService: ConfidentialityService) {}

  @Get('/')
  getAllConfidentiality() {
    return this.confidentialityService.getAllConfidentiality();
  }

  @UseGuards(AdminGuard)
  @Post('/create')
  createConfidentiality(@Body()dto:confidentialityDto){
    return this.confidentialityService.createConfidentiality( dto)
  }

  @UseGuards(AdminGuard)
  @Patch('/update/:id')
  updateConfidentiality(@Param('id') id: string , @Body()dto:confidentialityDto){
    return this.confidentialityService.updateConfidentiality( id, dto)
  }

  @UseGuards(AdminGuard)
  @Delete('/delete/:id')
  deleteConfidentiality(@Param('id') id :string){
    return this.confidentialityService.deleteConfidentiality(id)
  }

}
