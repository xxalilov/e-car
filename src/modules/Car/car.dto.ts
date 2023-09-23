import { IsOptional, IsString } from "class-validator";

export class CreateCarDto {
  @IsString()
  public model: string;

  @IsString()
  public name: string;

  @IsString()
  public carNumber: string;

  @IsString()
  public licenseNumber: string;

  @IsString()
  @IsOptional({ always: false })
  public photo: string;
}
