import { NextFunction, Response } from "express";
import { RequestWithUser } from "../Auth/auth.interface";
declare class AdminController {
    private adminService;
    updateAdminEmail(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
    updateAdminPassword(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
}
export default AdminController;
