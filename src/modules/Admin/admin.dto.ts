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

export class CreateAdmin {
  @IsString()
  @IsOptional({ always: false })
  public fullname: string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}


export class UpdateAdminDetails {
  @IsString()
  @IsOptional({ always: false })
  public fullname: string;

  @IsEmail()
  @IsOptional({ always: false })
  public email: string;

  @IsString()
  @IsOptional({ always: false })
  public password: string;
}

export class UpdateAdminPassword {
  @IsString()
  public currentPassword: string;

  @IsString()
  public password: string;

  @IsString()
  public reapetPassword: string;
}
