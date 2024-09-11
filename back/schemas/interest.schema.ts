import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps:true})

export class interest {

    @Prop({unique: true})
    name: string

    @Prop()
    userId: string
}
export const commentSchema= SchemaFactory.createForClass(interest)