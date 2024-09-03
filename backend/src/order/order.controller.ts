import { Body, Controller, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';
import { messages } from '../utils/messages';
import { Request, Response } from 'express';
import { statusCodes } from 'src/utils/statusCodes';
import { UpdateOrderDto } from './dto/updateOrder.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/create-order')
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const userId = req.user?.id;
    //console.log("OrderControler  userId",userId);
    if (!userId) {
      return res.status(statusCodes.UNAUTHORIZED).json({
        success: false,
        message: messages.USER_NOT_AUTHORIZED,
      });
    }
    try {
      const newOrder = await this.orderService.createOrder(
        createOrderDto,
        userId,
      );
      return res.status(200).json({
        success: true,
        message: messages.ORDER_CREATED,
        newOrder,
      });
    } catch (error) {
      console.log(`[Order Controller] error in CreateOrder:${error}`);
      return res
        .status(statusCodes.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: error.message });
    }
  }

  //GET ORDER BY ID
  @Get(':id')
  async getOrder(@Param('id') id: string, @Res() res) {
    try {
      const order = await this.orderService.getOrder(id);
      return res.status(statusCodes.OK).json({
        success: 'true',
        message: messages.ORDER_FETCHED,
        order,
      });
    } catch (error) {
      console.log(`[Order Controller] error in GetOrder:${error}`);
      return res
        .status(statusCodes.INTERNAL_SERVER_ERROR)
        .json({ success: 'false', message: error.message });
    }
  }

  //UPDATE ORDER STATUS
  @Put('/update-order/:id')
  async updateOrderStatus(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @Res() res,
  ) {
    try {
      const order = await this.orderService.updateOrderStatus(
        id,
        updateOrderDto,
      );
      return res.status(statusCodes.OK).json({
        success: 'true',
        message: messages.ORDER_UPDATED,
        order,
      });
    } catch (error) {
      console.log(`[Order Controller] error in UpdateOrderStatus:${error}`);
      return res
        .status(statusCodes.INTERNAL_SERVER_ERROR)
        .json({ success: 'false', message: error.message });
    }
  }
}

