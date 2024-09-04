import {Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document } from 'mongoose';

@Schema({
    timestamps:true,
})

export class  User extends Document {
    @Prop({require:true})
    name :string;

    @Prop({unique:[true , `Duplicate email entered` ]})
    email:string

    @Prop({require:true})
    password:string

    @Prop({require:true})
    address:string;

}
export const UserSchema = SchemaFactory.createForClass(User);

