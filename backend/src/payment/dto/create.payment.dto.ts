import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsString()
  orderId:string;

  // @IsNotEmpty()
  // @IsString()
  // status: string;
}
