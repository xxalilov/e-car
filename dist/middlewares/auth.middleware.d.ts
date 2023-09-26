import { NextFunction, Response } from "express";
import { RequestWithUser } from "../modules/Auth/auth.interface";
declare const authMiddleware: (role: string) => (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
export default authMiddleware;
