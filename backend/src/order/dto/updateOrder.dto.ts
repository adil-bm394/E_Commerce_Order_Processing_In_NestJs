import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateOrderDto {
  @IsNotEmpty()
  @IsString()
  status: string;
}
