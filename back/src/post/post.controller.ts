import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { JwtGuard } from 'src/auth/guards';
import { createPostDto, updatePostDto } from './dto';
import { GetUser } from 'src/auth/decorator';
import { user } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

 @Get()
  getAllPost(@GetUser() user :user){
  return this.postService.getAllPost( user )
  }

  @Get('/byId/:id')
  getPostById(@Param('id') id: string){
    return this.postService.getPostById(id)
  }

  @Post('/create')
  createPost(@Body() dto: createPostDto, @GetUser() user:user) {
    return this.postService.createPost(dto, user.id)
  }

  @Put('/update/:id')
  updatePost(@Param('id') id: string, @Body() dto: updatePostDto, @GetUser() user:user) {
    return this.postService.updatePost(id,dto, user.id)
  }

  @Delete('/delete/:id')
  deletePost(@Param('id') id: string, @GetUser() user:user) {
    return this.postService.deletePost(id, user.id)
  }
}
