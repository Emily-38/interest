import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { comment } from 'schemas/comment.schema';
import { commentDto } from './dto';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class CommentService {
    constructor(
        @InjectModel(comment.name) private commentModel:Model<comment>,
        private readonly prisma: PrismaService) {}

        async getAllComment(){
           return await this.commentModel.find()
        }
        
       async getAllCommentByPost(postId: string){
            const comment = await   this.commentModel.find({postId}).sort({ createdAt: -1 })
            const commentsWithUsers = await Promise.all(
            comment.map(async (comment) => {
                const user = await this.prisma.user.findMany({ 
                    where:{
                        id:comment.userId
                    }
                })
                return {comment:comment, user:user} 
              })
            )
            return commentsWithUsers
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
