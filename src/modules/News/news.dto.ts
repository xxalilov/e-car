import { IsOptional, IsString } from "class-validator";

export class CreateNewsDto {
    @IsString()
    public title: string;

    @IsString()
    public description: string;

    @IsString()
    public image: string;

    @IsString()
    public link: string;
}

export class UpdateNewsDto {
    @IsString()
    @IsOptional({ always: false })
    public title: string;

    @IsString()
    @IsOptional({ always: false })
    public description: string;

    @IsString()
    @IsOptional({ always: false })
    public image: string;

    @IsString()
    @IsOptional({ always: false })
    public link: string;
}
