import { Body, Controller, Param, Post, Res } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { statusCodes } from 'src/utils/statusCodes';
import { messages } from 'src/utils/messages';
import { Response } from 'express';

@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Post(':orderId')
  async shipOrder(
    @Param('orderId') orderId: string,
    @Res() res:Response
  ) {
     if (!orderId) {
        res.status(statusCodes.BAD_REQUEST).json({
        success: false,
        message: messages.PARAM_ID_MISSSING,
      });
       return ;
    }

    try {
      const order = await this.shippingService.shipOrder(
        orderId
      );
      res.status(statusCodes.OK).json({
        success: true,
        message:messages.ORDER_SHIPPED,
        data: order,
      });
      return;
    } catch (error) {
      console.log(`[Shipped Controller] error in ShipOrder :${error}`)
       res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
      return ;
    }
  }

  }

