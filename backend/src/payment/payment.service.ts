import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Payment } from './schemas/payment.schema';
import { JwtService } from '@nestjs/jwt';
import {Model} from 'mongoose';
import { CreatePaymentDto } from './dto/create.payment.dto';

@Injectable()
export class PaymentService {
  private failureProbability = 0.2;
  constructor(
    @InjectModel(Payment.name) private readonly PaymentModel: Model<Payment>,
    private readonly jwtService: JwtService,
  ) {}

  private simulatePaymentFailure(): boolean {
    return Math.random() < this.failureProbability;
  }
  //CREATE PAYMENT
  async createPayment(
    createPaymentDto: CreatePaymentDto,
    userId:string
  ): Promise<Payment> {
    const isFailure = this.simulatePaymentFailure();
    const status = isFailure ? "Failed" : "success";

    const newPayment = new this.PaymentModel({
      ...createPaymentDto,
      status,
      userId
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

