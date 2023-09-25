import { IsOptional, IsString } from "class-validator";

export class CreateAdvertisingDto {
  @IsString()
  public link: string;

  @IsString()
  @IsOptional({ always: false })
  public photo: string;
}
