import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model,  Types } from 'mongoose';
import { post } from 'schemas/post.schema';
import { createPostDto, updatePostDto } from './dto';
import { user } from '@prisma/client';

@Injectable()
export class PostService {
    constructor(@InjectModel(post.name) private postModel:Model<post>,) {}
    
    async getAllPost(user:user){
     const posts = await this.postModel.find().sort({ createdAt: -1 }).populate('comment').exec()
     return posts.map(post => ({
        ...post.toObject(), 
        user, 
      }));
    }

    async getPostById(id: string, user:user){
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) {
            throw new ForbiddenException('Cette publication n\'existe pas');
        }
        const existingPost = await this.postModel.findById(id).exec();
        if (!existingPost) {
            throw new ForbiddenException('Cette publication n\'existe pas');
        }
        const post = await this.postModel.findById(id).populate('comment').exec();
    
        return {
            ...post.toObject(),  
            user: user}
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
       
        if (userId !== existingPost.userId) {
            throw new ForbiddenException('Update unauthorized');
        }

        if(!updatePostDto.description){
            updatePostDto.description=existingPost.description
        }
        return await this.postModel.findByIdAndUpdate( 
            id,
            {   ...updatePostDto,
        
            },{new:true}).exec()
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
        if( existingPost.favorite.includes(userId)){
            
            updateOperation = { $pull: { favorite: userId } };
        } else {
            updateOperation= { $addToSet: { favorite: userId }}; 
          }

          return this.postModel.findByIdAndUpdate(
            id,
            updateOperation,  
            { new: true }  
          );
    }

    async deletePost( id: string){
        
        const existingPost= await this.postModel.findById(id)

        if(!existingPost){
            throw new ForbiddenException('post not found')
        }

        return this.postModel.findByIdAndDelete(id)
    }
}
