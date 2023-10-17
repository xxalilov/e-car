import { IsOptional, IsString } from "class-validator";

export class CreateTypeOfWorkshopDto {
  @IsString()
  public title_uz: string;
  @IsString()
  public title_ru: string;
  @IsString()
  public title_eng: string;

  @IsString()
  @IsOptional({ always: false })
  public photo: string;
}
