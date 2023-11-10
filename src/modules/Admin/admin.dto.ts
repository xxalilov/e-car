import {IsEmail, IsOptional, IsString} from "class-validator";

export class CreateAdminDto {

  @IsEmail()
  @IsOptional({ always: false })
  public fullname: string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export class UpdateAdminEmail {
  @IsString()
  @IsOptional({ always: false })
  public fullname: string;

  @IsEmail()
  public email: string;
}

export class UpdateAdminPassword {
  @IsString()
  public currentPassword: string;

  @IsString()
  public password: string;

  @IsString()
  public reapetPassword: string;
}
