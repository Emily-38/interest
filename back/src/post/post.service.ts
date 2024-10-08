import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model,  Types } from 'mongoose';
import { post } from 'schemas/post.schema';
import { createPostDto, updatePostDto } from './dto';
import { user } from '@prisma/client';

@Injectable()
export class PostService {
    constructor(@InjectModel(post.name) private postModel:Model<post>,) {}
    
    async getAllPost(user:user){
     const posts = await this.postModel.find().populate('comment').exec()
     return posts.map(post => ({
        ...post.toObject(), 
        user, 
      }));
    }

    getPostById(id: string){
        return this.postModel.findById(id).populate('comment').exec()
    }

    createPost(createPost: createPostDto, userId: string){
        const newPost= new this.postModel({...createPost, userId, interestId:createPost.interestId})
       return newPost.save()       
    }

    async updatePost( id: string,  updatePostDto: updatePostDto, userId: string){

        const existingPost= await this.postModel.findById(id)

        if(!existingPost){
            throw new ForbiddenException('post not found')
        }
       
        if(userId !== existingPost.userId ) {
            throw new ForbiddenException('update unauthorized')
        }

        return this.postModel.findByIdAndUpdate( 
            id,
            {   updatePostDto,
                interestId:updatePostDto.interestId
            },{new:true})
    }

    async likePost( id: string, userId: string){
        const existingPost= await this.postModel.findById(id)

        if(!existingPost){
            throw new ForbiddenException('post not found')
        }

        let updateOperation: any = {};
        if( existingPost.like.includes(userId)){
            
            updateOperation = { $pull: { like: userId } };
        } else {
            updateOperation= {$addToSet: { like: userId }}; 
          }

          return this.postModel.findByIdAndUpdate(
            id,
            updateOperation,  
            { new: true }  
          );
    }

    async savePost( id: string, userId: string){
        const existingPost= await this.postModel.findById(id)

        if(!existingPost){
            throw new ForbiddenException('post not found')
        }

        let updateOperation: any = {};
        if( existingPost.save.includes(userId)){
            
            updateOperation = { $pull: { save: userId } };
        } else {
            updateOperation= { $addToSet: { save: userId }}; 
          }

          return this.postModel.findByIdAndUpdate(
            id,
            updateOperation,  
            { new: true }  
          );
    }

    async deletePost( id: string, userId: string){
        
        const existingPost= await this.postModel.findById(id)

        if(!existingPost){
            throw new ForbiddenException('post not found')
        }
       
        if(userId !== existingPost.userId ) {
            throw new ForbiddenException('delete unauthorized')
        }

        return this.postModel.findByIdAndDelete(id)
    }
}
