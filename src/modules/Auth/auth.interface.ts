import { Request } from "express";
import { User } from "../../modules/Users/user.interface";

export interface DataStoredInToken {
  id: string;
}

export interface TokenData {
  token: string;
  // expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}
