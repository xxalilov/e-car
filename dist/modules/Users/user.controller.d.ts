import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "../../modules/Auth/auth.interface";
declare class UserController {
    private userService;
    getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
    getUserById(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateUser(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
}
export default UserController;
