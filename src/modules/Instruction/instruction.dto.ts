import { IsOptional, IsString } from "class-validator";

export class CreateInstructionDto {
    @IsString()
    public title: string;

    @IsString()
    @IsOptional({ always: false })
    public description: string;

    @IsString()
    @IsOptional({ always: false })
    public link: string;

    @IsString()
    public type: string;

    @IsString()
    @IsOptional({ always: false })
    public typeId: string;
}

export class UpdateInstructionDto {
    @IsString()
    @IsOptional({ always: false })
    public title: string;

    @IsString()
    @IsOptional({ always: false })
    public description: string;

    @IsString()
    @IsOptional({ always: false })
    public link: string;

    @IsString()
    @IsOptional({ always: false })
    public type: string;

    @IsString()
    @IsOptional({ always: false })
    public typeId: string;
}
