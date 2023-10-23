import { IsOptional, IsString } from "class-validator";

export class CreateTypeOfProductDto {
  @IsString()
  public uz: string;

  @IsString()
  public eng: string;

  @IsString()
  public ru: string;

  @IsString()
  @IsOptional({ always: false })
  public photo: string;
}

export class UpdateTypeOfProductDto {
  @IsString()
  @IsOptional({ always: false })
  public uz: string;

  @IsString()
  @IsOptional({ always: false })
  public eng: string;

  @IsString()
  @IsOptional({ always: false })
  public ru: string;

  @IsString()
  @IsOptional({ always: false })
  public photo: string;
}
