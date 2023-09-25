import { IsEmail, IsString } from "class-validator";

export class CreateAdminDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export class UpdateAdminEmail {
  @IsEmail()
  public email: string;
}

export class UpdateAdminPassword {
  @IsString()
  public password: string;
}
