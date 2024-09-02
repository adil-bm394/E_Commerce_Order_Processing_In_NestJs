import {  MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { ShippingModule } from './shipping/shipping.module';
import { AuthModule } from './auth/auth.module';
import { PaymentController } from './payment/payment.controller';
import { PaymentService } from './payment/payment.service';
import { OrderModule } from './order/order.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { AuthMiddleware } from './auth/middleware/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    OrderModule,
    ShippingModule,
    AuthModule,
    ProductModule,
    JwtModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/order', method: RequestMethod.ALL },
        { path: '/payment', method: RequestMethod.ALL },
      );
  }
}