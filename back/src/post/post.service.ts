import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose, Types } from 'mongoose';
import { post } from 'schemas/post.schema';
import { createPostDto, updatePostDto } from './dto';



@Injectable()
export class PostService {
    constructor(@InjectModel(post.name) private postModel:Model<post>,) {}
    
    getAllPost(){
        return this.postModel.find()
    }

    getPostById(id: string){
        return this.postModel.findById(id)
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

        return this.postModel.findByIdAndUpdate( id,{updatePostDto,interestId:updatePostDto.interestId},{new:true})
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
