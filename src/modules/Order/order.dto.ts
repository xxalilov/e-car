import {IsString, IsNumber} from "class-validator";

export class CreateOrderDto {
    @IsString()
    public shipping_type: string;

    @IsString()
    public shipping_address: string;

    @IsString()
    public payment_type: string;
}