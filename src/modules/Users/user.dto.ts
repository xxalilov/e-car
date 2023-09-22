import { IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  public phone: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional({ always: false })
  public firstname: string;

  @IsString()
  @IsOptional({ always: false })
  public lastname: string;

  @IsString()
  @IsOptional({ always: false })
  public phone: string;

  @IsString()
  @IsOptional({ always: false })
  public photo: string;
}
