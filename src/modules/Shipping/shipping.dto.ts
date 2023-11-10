import {IsNumber, IsOptional, IsString} from "class-validator";

export class CreateShippingDto {
    @IsString()
    public type: string;

    @IsNumber()
    public price: number;
}

export class UpdateShippingDto {
    @IsString()
    @IsOptional({ always: false })
    public type: string;

    @IsNumber()
    @IsOptional({ always: false })
    public price: number;
}
