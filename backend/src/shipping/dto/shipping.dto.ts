import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class ShippingDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  readonly phone: string;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(6)
  readonly pinCode: string;

  @IsNotEmpty()
  @IsString()
  readonly state: string;
}