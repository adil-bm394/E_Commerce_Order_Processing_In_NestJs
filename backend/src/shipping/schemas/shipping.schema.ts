// import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
// import { Document, ObjectId, Schema as MongooseSchema } from 'mongoose';

// @Schema()
// export class Shipping extends Document {
//   @Prop({ type: MongooseSchema.Types.Mixed, ref: 'Orders', required: true })
//   orderId: ObjectId;

//   @Prop({ required: true })
//   name: string;

//   @Prop({ require: true })
//   phone: string;

//   @Prop({ require: true })
//   address: string;

//   @Prop({ require: true })
//   pinCode: string;

//   @Prop({ require: true })
//   state: string;
// }

// export const ShippingSchema = SchemaFactory.createForClass(Shipping);