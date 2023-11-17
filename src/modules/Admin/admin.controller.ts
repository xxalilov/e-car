import { Request, NextFunction, Response } from "express";
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
      const userId = req.user.id.toString();
      const updatedUser: Admin = await this.adminService.updateAdminEmail(
        userId,
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
      const userId = req.user.id.toString();
      const updatedUser: Admin = await this.adminService.updateAdminPassword(
        userId,
        userData
      );
      res
        .status(200)
        .json({ data: updatedUser, message: "updateUserPassword" });
    } catch (error) {
      next(error);
    }
  }

  public async getAllAdmins(req: RequestWithUser, res: Response, next: NextFunction) {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    try {
      const findAllAdminData = await this.adminService.getAllAdmins(page, pageSize);
      res.status(200).json({...findAllAdminData, message: "findAll"});
    } catch (error) {
      next(error);
    }
  }

  public async updateAdminDetails(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const userData = req.body;
      const userId = req.params.id;
      const updatedUser: Admin = await this.adminService.updateAdminDetails(
        userId,
        userData
      );
      res
        .status(200)
        .json({ data: updatedUser, message: "updateUserDetails" });
    } catch (error) {
      next(error);
    }
  }

  public async createAdmin(req: Request, res: Response, next: NextFunction) {
    try{
      const adminData = req.body
      const newAdmin = await this.adminService.createAdmin(adminData);
      res.status(201).json({data: newAdmin, message: "created"})
    } catch (error) {
      next(error)
    }
  }

  public async deleteAdminById(req: Request, res: Response, next: NextFunction) {
    try {
      const deletedAdminData = await this.adminService.deleteAdmin(
        req.params.id
      );
      res.status(200).json({ data: deletedAdminData, message: "deleted" });
    } catch (error) {
      next(error);
    }
  }
}

export default AdminController;
