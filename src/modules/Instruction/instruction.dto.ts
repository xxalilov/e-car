import {IsOptional, IsString} from "class-validator";

export class CreateInstructionDto {
    @IsString()
    public title_uz: string;

    @IsString()
    public title_ru: string;

    @IsString()
    public title_eng: string;

    @IsString()
    @IsOptional({always: false})
    public description_uz: string;

    @IsString()
    @IsOptional({always: false})
    public description_ru: string;

    @IsString()
    @IsOptional({always: false})
    public description_eng: string;

    @IsString()
    @IsOptional({always: false})
    public link: string;

    @IsString()
    @IsOptional({always: false})
    public youtubeCover: string;

    @IsString()
    public type: string;

    @IsString()
    @IsOptional({always: false})
    public typeId: string;
}

export class UpdateInstructionDto {
    @IsString()
    @IsOptional({always: false})
    public title_uz: string;

    @IsString()
    @IsOptional({always: false})
    public title_ru: string;

    @IsString()
    @IsOptional({always: false})
    public title_eng: string;

    @IsString()
    @IsOptional({always: false})
    public description_uz: string;

    @IsString()
    @IsOptional({always: false})
    public description_ru: string;

    @IsString()
    @IsOptional({always: false})
    public description_eng: string;

    @IsString()
    @IsOptional({always: false})
    public link: string;

    @IsString()
    @IsOptional({always: false})
    public youtubeCover: string;

    @IsString()
    @IsOptional({always: false})
    public type: string;

    @IsString()
    @IsOptional({always: false})
    public typeId: string;
}
