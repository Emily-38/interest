import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { comment } from "./comment.schema";
import { interest } from "./interest.schema";
import mongoose from "mongoose";


@Schema({timestamps: true})
export class post {
    @Prop()
    description: string

    @Prop({required: false})
    image: string

    @Prop()
    userId: string

    @Prop({type:mongoose.Schema.Types.ObjectId, ref: 'comment'})
    comment: comment[]

    @Prop({type:mongoose.Schema.Types.ObjectId, ref: 'interest'})
    interest: interest[]
}

export const postSchema= SchemaFactory.createForClass(post)