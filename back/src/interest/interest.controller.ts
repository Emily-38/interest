import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { InterestService } from './interest.service';
import { interestDto } from './dto';
import { AdminGuard, JwtGuard } from 'src/auth/guards';


@UseGuards(JwtGuard)
@Controller('interest')
export class InterestController {
  constructor(private readonly interestService: InterestService) {}

  @Get('/')
  getAllInterest(){
    return this.interestService.getAllInterest()
  }

  @Get('/byId/:id')
  getInterestById(@Param('id') id :string){
    return this.interestService.getInterestById(id)
  }

  @Post('/create')
  createInterest(@Body() interest: interestDto){
    return this.interestService.createInterest(interest)
  }

  @UseGuards(AdminGuard)
  @Patch('/update/:id')
  UpdateInterest(@Param('id') id : string , @Body() interest: interestDto){
    return this.interestService.updateInterest(id,interest)
  }

  @UseGuards(AdminGuard)
  @Delete('/delete/:id')
  deleteInterest(@Param('id') id : string ){
    return this.interestService.deleteInterest(id)
  }


}
