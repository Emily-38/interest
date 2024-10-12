import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { comment } from "./comment.schema";
import mongoose, { Types } from "mongoose";


@Schema({timestamps: true})
export class post {
    @Prop()
    description: string

    @Prop({required: false})
    image: string

    @Prop()
    userId: string

    @Prop()
    like:string[]

    @Prop()
    favorite:string[]

    @Prop()
    interestId:string[]


    @Prop({type:mongoose.Schema.Types.ObjectId, ref: 'comment'})
    comment: comment[]
}

export const postSchema= SchemaFactory.createForClass(post)