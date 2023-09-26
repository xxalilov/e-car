import { Request } from "express";
import { User } from "../../modules/Users/user.interface";
import { Admin } from "../../modules/Admin/admin.interface";
export interface DataStoredInToken {
    id: string;
}
export interface TokenData {
    token: string;
}
export interface RequestWithUser extends Request {
    user: User | Admin;
}
