import { IsOptional, IsString } from "class-validator";

export class CreateTypeOfProductDto {
  @IsString()
  public title: string;

  @IsString()
  @IsOptional({ always: false })
  public photo: string;
}
