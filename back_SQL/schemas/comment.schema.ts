import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps: true})
export class comment {

    @Prop()
    description: string

    @Prop()
    postId:string

    @Prop()
    userId: string
}
export const commentSchema= SchemaFactory.createForClass(comment)