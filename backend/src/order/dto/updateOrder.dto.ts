import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateOrderDto {
  // @IsNotEmpty()
  // @IsString()
  // orderId:string;

  @IsNotEmpty()
  @IsString()
  status: string;
}
