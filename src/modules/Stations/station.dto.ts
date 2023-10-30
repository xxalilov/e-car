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

export class UpdateStationDto {
  @IsString()
  @IsOptional({ always: false })
  public lat: string;

  @IsString()
  @IsOptional({ always: false })
  public long: string;

  @IsString()
  @IsOptional({ always: false })
  public title_uz: string;

  @IsString()
  @IsOptional({ always: false })
  public title_ru: string;

  @IsString()
  @IsOptional({ always: false })
  public title_eng: string;
}
