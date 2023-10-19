import {IsString, IsNumber} from "class-validator";

export class CreateOrderDto {
    @IsString()
    public shipping_type: string;

    @IsString()
    public shipping_address: string;

    @IsNumber()
    public shipping_price: number;

    @IsString()
    public payment_type: string;
}