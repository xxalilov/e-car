import { IsOptional, IsString } from "class-validator";

export class CreateNewsDto {
    @IsString()
    public title_uz: string;

    @IsString()
    public title_ru: string;

    @IsString()
    public title_eng: string;

    @IsString()
    public description_uz: string;

    @IsString()
    public description_eng: string;

    @IsString()
    public description_ru: string;

    @IsString()
    public image: string;

    @IsString()
    public link: string;
}

export class UpdateNewsDto {
    @IsString()
    @IsOptional({ always: false })
    public title_uz: string;

    @IsString()
    @IsOptional({ always: false })
    public title_ru: string;

    @IsString()
    @IsOptional({ always: false })
    public title_eng: string;

    @IsString()
    @IsOptional({ always: false })
    public description_uz: string;

    @IsString()
    @IsOptional({ always: false })
    public description_eng: string;

    @IsString()
    @IsOptional({ always: false })
    public description_ru: string;

    @IsString()
    @IsOptional({ always: false })
    public image: string;

    @IsString()
    @IsOptional({ always: false })
    public link: string;
}
