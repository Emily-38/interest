import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { comment } from 'schemas/comment.schema';
import { commentDto } from './dto';


@Injectable()
export class CommentService {
    constructor(
        @InjectModel(comment.name) private commentModel:Model<comment>) {}

        getAllCommentByPost(postId: string){
            return this.commentModel.find({postId})
        }
    
        getCommentById(id: string){
            return this.commentModel.findById(id)
        }

        createComment(postId: string, dto: commentDto, userId: string ){
            const newComment= new this.commentModel({postId ,userId,...dto})
            return newComment.save()
        }

        async updatecomment( id: string,  dto: commentDto, userId : string ){

            const existingComment= await this.commentModel.findById(id)
    
            if(!existingComment){
                throw new ForbiddenException('Comment not found')
            }

            if(userId !== existingComment.userId ) {
                throw new ForbiddenException('update unauthorized')
            }
    
            return this.commentModel.findByIdAndUpdate(id,dto)
        }

        async deleteComment( id: string, userId: string ){

            const existingComment= await this.commentModel.findById(id)
    
            if(!existingComment){
                throw new ForbiddenException('Comment not found')
            }

            if(userId !== existingComment.userId ) {
                throw new ForbiddenException('update unauthorized')
            }
    
            return this.commentModel.findByIdAndDelete(id)
        }

    
}
