import { IsOptional, IsString } from "class-validator";

export class CreateWorkshopDto {
  @IsString()
  public address_uz: string;

  @IsString()
  public address_ru: string;

  @IsString()
  public address_eng: string;

  @IsString()
  public title_uz: string;

  @IsString()
  public title_ru: string;

  @IsString()
  public title_eng: string;

  @IsString()
  public description_uz: string;

  @IsString()
  public description_eng: string;

  @IsString()
  public description_ru: string;

  @IsString()
  public phone: string;

  @IsString()
  public workingTime: string;

  @IsString()
  public lat: string;

  @IsString()
  public long: string;

  @IsString()
  public typeOfWorkshopId: string;
}

export class UpdateWorkshopDto {
  @IsString()
  @IsOptional({ always: false })
  public address_uz: string;

  @IsString()
  @IsOptional({ always: false })
  public address_ru: string;

  @IsString()
  @IsOptional({ always: false })
  public address_eng: string;

  @IsString()
  @IsOptional({ always: false })
  public title_uz: string;

  @IsString()
  @IsOptional({ always: false })
  public title_ru: string;

  @IsString()
  @IsOptional({ always: false })
  public title_eng: string;

  @IsString()
  @IsOptional({ always: false })
  public description_uz: string;

  @IsString()
  @IsOptional({ always: false })
  public description_eng: string;

  @IsString()
  @IsOptional({ always: false })
  public description_ru: string;

  @IsString()
  @IsOptional({ always: false })
  public phone: string;

  @IsString()
  @IsOptional({ always: false })
  public workingTime: string;

  @IsString()
  @IsOptional({ always: false })
  public lat: string;

  @IsString()
  @IsOptional({ always: false })
  public long: string;

  @IsString()
  @IsOptional({ always: false })
  public typeOfWorkshopId: string;
}
