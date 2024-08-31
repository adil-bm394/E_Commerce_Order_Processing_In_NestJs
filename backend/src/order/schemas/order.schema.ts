import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Schema as MongooseSchema } from 'mongoose';


@Schema()
export class Order extends Document {
  //   @Prop({ required: true })
  //   productId: string;

  @Prop({ type: MongooseSchema.Types.Mixed, ref: 'Users', required: true })
  userId: ObjectId;

  @Prop({ required: true })
  product: string;

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({ default: 'created' })
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
