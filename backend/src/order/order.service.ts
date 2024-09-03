import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './schemas/order.schema';
import { CreateOrderDto } from './dto/order.dto';
import { messages } from 'src/utils/messages';
import { UpdateOrderDto } from './dto/updateOrder.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    private readonly jwtService: JwtService, 
  ) {}  

  async createOrder(createOrderDto: CreateOrderDto, userId: string): Promise<Order> {
    //console.log("[Order.Service] userId",userId)
    if (!userId) {
      throw new UnauthorizedException(messages.USER_NOT_AUTHORIZED);
    }

    const newOrder = new this.orderModel({ ...createOrderDto, userId });
    await newOrder.save();

    return newOrder;
  }

  //GET ORDER
  async getOrder(id: string): Promise<Order> {

    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new NotFoundException(messages.ORDER_NOT_FOUND);
    }

    return order;
  }


  //UPDATE ORDER STATUS
  async updateOrderStatus(
    orderId:string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    const order = await this.orderModel.findById(orderId).exec();
    if (!order) {
      throw new NotFoundException(messages.ORDER_NOT_FOUND);
    }

    if (updateOrderDto.status !== undefined) {
      order.status = updateOrderDto.status;
    }

    await order.save();

    return order;
  }
}