import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../order/schemas/order.schema';
import { User } from '../auth/schemas/user.schema';
import { messages } from '../utils/messages';
import { sendNotification } from './emailService/emailNotification';


@Injectable()
export class ShippingService {
  constructor(
    @InjectModel(Order.name) private OrderModel: Model<Order>,
    @InjectModel(User.name) private UserModel: Model<User>,
  ) {}

  //SHIPPING ORDER
  async shipOrder(orderId: string): Promise<Order> {
    const order = await this.OrderModel.findById(orderId);
    if (!order) {
      throw new NotFoundException({
        success: false,
        message: messages.ORDER_NOT_FOUND,
      });
    }
    if (order.status !== 'confirmed') {
      throw new UnprocessableEntityException({
        success: false,
        message: messages.ORDERED_NOT_CONFIRMED,
      });
    }

    order.status = 'shipped';
    await order.save();

    const user = await this.UserModel.findById(order.userId);
     user.password=undefined;
 const orderDetail={
    orderId:order.id,
    product:order.product,
    amount:order.totalAmount
 }
   // console.log("[shipping controlelr] user:",user);
  // console.log('[shipping controlelr] order:', orderDetail);
    if (user) {
     await sendNotification(user, orderDetail); 
    }

    return order;
  }
}
