import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { comment, commentSchema } from 'schemas/comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: comment.name,
      schema: commentSchema
    }])
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
