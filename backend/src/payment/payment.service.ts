import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Payment } from './schemas/payment.schema';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { CreatePaymentDto } from './dto/create.payment.dto';
import { Response } from 'express';
import { statusCodes } from 'src/utils/statusCodes';
import { messages } from 'src/utils/messages';
import { OrderService } from '../order/order.service';
import { UpdateOrderDto } from '../order/dto/updateOrder.dto';

@Injectable()
export class PaymentService {
  private failureProbability = 0.2;
  constructor(
    @InjectModel(Payment.name) private readonly PaymentModel: Model<Payment>,
    private readonly jwtService: JwtService,
    private readonly orderService: OrderService,
  ) {}

  private simulatePaymentFailure(): boolean {
    return Math.random() < this.failureProbability;
  }
  //CREATE PAYMENT
  async createPayment(
    createPaymentDto: CreatePaymentDto,
    userId: string,
  ): Promise<Payment> {
    // console.log("[payment service]createPaymentDto",createPaymentDto);
    // console.log("[Payment service]userId",userId);

    const isFailure = this.simulatePaymentFailure();
    const status = isFailure ? 'failed' : 'success';

    if (status === 'failed') {
      throw new BadRequestException({
        success: false,
        message: messages.PAYMENT_FAILED,
      });
    }
//================This is used for update Order Status ============
    const updateOrderDto = new UpdateOrderDto();
    updateOrderDto.status = 'confirmed';
    const res = await this.orderService.updateOrderStatus(
      createPaymentDto.orderId,
      updateOrderDto,
    );

    //console.log('[payment service]response from updateOrder', res);
//======================================================================

    const newPayment = new this.PaymentModel({
      ...createPaymentDto,
      status,
      userId,
    });
    return newPayment.save();
  }

  // FIND PAYMENT  STATUS OF ORDER
  async findPaymentStatus(id: string): Promise<Payment> {
    const payment = await this.PaymentModel.findById(id).exec();
    if (!payment) {
      throw new NotFoundException(
        `[Paynment.controller]Payment with ID ${id} not found`,
      );
    }
    return payment;
  }
}
