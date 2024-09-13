import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtGuard } from 'src/auth/guards';
import { GetUser } from 'src/auth/decorator';
import { commentDto } from './dto';
import { user } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/bypostId/:id')
  getAllCommentByPostId(@Param('id') postId: string){
  return this.commentService.getAllCommentByPost(postId)
  }

  @Get('/byId/:id')
  getCommentById(@Param('id') id: string){
    return this.commentService.getCommentById(id)
  }

  @Post('/create/:id')
  createComment(@Param('id') postId: string,  @Body() dto: commentDto, @GetUser() user:user) {
    return this.commentService.createComment( postId,dto,user.id)
  }

  
  @Patch('/update/:id')
  updateComment(@Param('id') id: string, @Body() dto: commentDto, @GetUser() user:user) {
    return this.commentService.updatecomment(id,dto, user.id)
  }

  @Delete('/delete/:id')
  deleteComment(@Param('id') id: string, @GetUser() user:user) {
    return this.commentService.deleteComment(id, user.id)
  }

}
