import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { InterestService } from './interest.service';
import { JwtGuard } from 'src/auth/guards';
import { interestDto } from './dto';

@UseGuards(JwtGuard)
@Controller('interest')
export class InterestController {
  constructor(private readonly interestService: InterestService) {}

  @Get('/')
  getAllInterest() {
    return this.interestService.getAllInterest();
  }

  @Get('/byId/:id')
  getInterestById(@Param('id') id:string) {
    return this.interestService.getInterestById(id);
  }

  
  @Post('/create')
  createInterest(@Body()dto:interestDto){
    return this.interestService.createInterest( dto)
  }

  
  @Patch('/update/:id')
  updateInterest(@Param('id') id: string , @Body()dto:interestDto){
    return this.interestService.updateInterest( id, dto)
  }


  @Delete('/delete/:id')
  deleteInterest(@Param('id') id :string){
    return this.interestService.deleteInterest(id)
  }

}
