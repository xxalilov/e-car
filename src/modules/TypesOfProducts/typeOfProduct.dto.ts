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
