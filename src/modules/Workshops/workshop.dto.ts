import { IsOptional, IsString } from "class-validator";

export class CreateWorkshopDto {
  @IsString()
  public address: string;

  @IsString()
  public title: string;

  @IsString()
  public description: string;

  @IsString()
  public phone: string;

  @IsString()
  public workingTime: string;

  @IsString()
  public lat: string;

  @IsString()
  public long: string;

  @IsString()
  public typeId: string;
}

export class UpdateWorkshopDto {
  @IsString()
  @IsOptional({ always: false })
  public address: string;

  @IsString()
  @IsOptional({ always: false })
  public title: string;

  @IsString()
  @IsOptional({ always: false })
  public description: string;

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
  public typeId: string;
}
