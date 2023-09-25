import { IsOptional, IsString } from "class-validator";

export class CreateTypeOfWorkshopDto {
  @IsString()
  public title: string;

  @IsString()
  public photo: string;
}
