import { IsOptional, IsString } from "class-validator";

export class CreateOfferDto {
    @IsString()
    public text: string;

    @IsString()
    public userId: string;
}