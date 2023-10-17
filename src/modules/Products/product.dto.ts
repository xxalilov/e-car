import {IsNumber, IsOptional, IsString, isNumber} from "class-validator";

export class CreateProductDto {
    @IsString()
    public title_uz: string;
    @IsString()
    public title_ru: string;
    @IsString()
    public title_eng: string;
    @IsNumber()
    public price: number;
    @IsString()
    public description_uz: string;
    @IsString()
    public description_eng: string;
    @IsString()
    public description_ru: string;
    @IsString()
    public address_uz: string;
    @IsString()
    public address_ru: string;
    @IsString()
    public address_eng: string;
    @IsString()
    public lat: string;
    @IsString()
    public long: string;
    @IsString()
    @IsOptional({always: false})
    public photos: string[];
    @IsString()
    public phones: string;
    @IsString()
    @IsOptional({always: false})
    public typeOfProductId: string;
    @IsString()
    @IsOptional({always: false})
    public slug: string;
}

export class UpdateProductDto {
    @IsString()
    @IsOptional({always: false})
    public title: string;
    @IsNumber()
    @IsOptional({always: false})
    public price: number;
    @IsString()
    @IsOptional({always: false})
    public description: string;
    @IsString()
    @IsOptional({always: false})
    public address: string;
    @IsString()
    public lat: string;
    @IsString()
    @IsOptional({always: false})
    public long: string;
    @IsString()
    @IsOptional({always: false})
    public photos: string[];
    @IsString()
    @IsOptional({always: false})
    public phones: string;
    @IsString()
    @IsOptional({always: false})
    public typeOfProductId: string;
    @IsString()
    @IsOptional({always: false})
    public slug: string;
}
