import { Request } from "express";
import { User } from "../Users/user.interface";
import { Admin } from "../Admin/admin.interface";

export interface DataStoredInToken {
  id: string;
}

export interface TokenData {
  token: string;
  // expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User | Admin;
}
