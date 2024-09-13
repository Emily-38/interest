import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps:true})

export class interest {

    @Prop({unique: true})
    name: string

}
export const interestSchema= SchemaFactory.createForClass(interest)