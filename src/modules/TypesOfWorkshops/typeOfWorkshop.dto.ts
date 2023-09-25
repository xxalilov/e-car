import { IsOptional, IsString } from "class-validator";

export class CreateTypeOfWorkshopDto {
  @IsString()
  public title: string;

  @IsString()
  @IsOptional({ always: false })
  public photo: string;
}
