import { IsOptional, IsString } from "class-validator";

export class CreateStationDto {
  @IsString()
  public lat: string;

  @IsString()
  public long: string;

  @IsString()
  public title_uz: string;

  @IsString()
  public title_ru: string;

  @IsString()
  public title_eng: string;
}
