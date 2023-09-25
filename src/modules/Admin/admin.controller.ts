import { NextFunction, Request, Response } from "express";
import AdminService from "./admin.service";
import { Admin } from "./admin.interface";
import { UpdateAdminEmail, UpdateAdminPassword } from "./admin.dto";
import { RequestWithUser } from "../Auth/auth.interface";

class AdminController {
  private adminService = new AdminService();

  public async updateAdminEmail(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userData: UpdateAdminEmail = req.body;
      const updatedUser: Admin = await this.adminService.updateAdminEmail(
        req.user.id,
        userData
      );
      res.status(200).json({ data: updatedUser, message: "updateUserEmail" });
    } catch (error) {
      next(error);
    }
  }

  public async updateAdminPassword(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userData: UpdateAdminPassword = req.body;
      const updatedUser: Admin = await this.adminService.updateAdminPassword(
        req.user.id,
        userData
      );
      res
        .status(200)
        .json({ data: updatedUser, message: "updateUserPassword" });
    } catch (error) {
      next(error);
    }
  }
}

export default AdminController;
