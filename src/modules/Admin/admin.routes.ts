import { Router } from "express";
import { Routes } from "../../routes/route.interface";
import AdminController from "./admin.controller";
import validationMiddleware from "../../middlewares/validation.middleware";
import { UpdateAdminEmail, UpdateAdminPassword } from "./admin.dto";
import authMiddleware from "../../middlewares/auth.middleware";

class AdminRouter implements Routes {
  public path = "/admin";
  public router = Router();
  public adminController = new AdminController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.put(
      `${this.path}/email`,
      authMiddleware("admin"),
      validationMiddleware(UpdateAdminEmail, "body"),
      this.adminController.updateAdminEmail.bind(this.adminController)
    );

    this.router.put(
      `${this.path}/password`,
      authMiddleware("admin"),
      validationMiddleware(UpdateAdminPassword, "body"),
      this.adminController.updateAdminPassword.bind(this.adminController)
    );
  }
}
export default AdminRouter;
