import { Request, NextFunction, Response } from "express";
import { RequestWithUser } from "../Auth/auth.interface";
declare class AdminController {
    private adminService;
    updateAdminEmail(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
    updateAdminPassword(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
    getAllAdmins(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
    updateAdminDetails(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
    createAdmin(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteAdminById(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export default AdminController;
