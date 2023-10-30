import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "./auth.interface";
declare class AuthController {
    private authService;
    signInAdmin(req: Request, res: Response, next: NextFunction): Promise<void>;
    sendConfirmation(req: Request, res: Response, next: NextFunction): Promise<void>;
    checkConfirmation(req: Request, res: Response, next: NextFunction): Promise<void>;
    getCurrentUser(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
}
export default AuthController;
