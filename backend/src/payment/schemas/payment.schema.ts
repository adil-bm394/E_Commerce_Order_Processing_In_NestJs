import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId, Schema as MongooseSchema } from 'mongoose';


@Schema()
export class Payment extends Document {
  @Prop({ type: MongooseSchema.Types.Mixed, ref: 'Users', required: true })
  userId: ObjectId;

  @Prop({ type: MongooseSchema.Types.Mixed, ref: 'Orders', required: true })
  orderId: ObjectId;

  @Prop({required:true})
  status:string
}

export const PaymentSchema =SchemaFactory.createForClass(Payment);