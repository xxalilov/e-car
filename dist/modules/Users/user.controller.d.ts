import { NextFunction, Request, Response } from "express";
import { RequestWithFile } from "../../interfaces/file-upload.interface";
declare class UserController {
    private userService;
    getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
    getUserById(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateUser(req: RequestWithFile, res: Response, next: NextFunction): Promise<void>;
}
export default UserController;
