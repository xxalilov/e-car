import {IsString} from "class-validator";

export class CreateOrderDto {
    @IsString()
    public shipping_type: string;

    @IsString()
    public shipping_address: string;

    @IsString()
    public shipping_price: string;

    @IsString()
    public payment_type: string;
}