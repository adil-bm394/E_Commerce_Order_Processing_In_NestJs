import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create.payment.dto';
import { Payment } from './schemas/payment.schema';
import { Request, Response } from 'express';
import { statusCodes } from 'src/utils/statusCodes';
import { messages } from 'src/utils/messages';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async createPayment(
    @Body() createPaymentDto: CreatePaymentDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const userId = req.user?.id;
    if (!userId) {
        res.status(statusCodes.UNAUTHORIZED).json({
        success: false,
        message: messages.USER_NOT_AUTHORIZED,
      });
      return ;
    }

    try {
      const payment = await this.paymentService.createPayment(
        createPaymentDto,
        userId,
      );
      res.status(statusCodes.CREATED).json({
        success: true,
        data: payment,
      });
      return;
    } catch (error) {
      console.log(`[payment Controller] error :${error}`)
       res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
      return ;
    }
  }

  @Get(':id')
  async findPaymentStatus(@Param('id') id: string): Promise<Payment> {
    return this.paymentService.findPaymentStatus(id);
  }
}
