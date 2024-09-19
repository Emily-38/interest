import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { post, postSchema } from 'schemas/post.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{
      name: post.name,
      schema: postSchema
    }])
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
