import { Router } from "express";
import { Routes } from "../../routes/route.interface";
import AuthController from "./auth.controller";
import validationMiddleware from "../../middlewares/validation.middleware";
import { CreateAdminDto } from "../../modules/Admin/admin.dto";

class AuthRouter implements Routes {
  public path = "/auth";
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/send-confirmation`,
      this.authController.sendConfirmation.bind(this.authController)
    );

    this.router.post(
      `${this.path}/check-confirmation`,
      this.authController.checkConfirmation.bind(this.authController)
    );

    this.router.post(
      `${this.path}/signin/admin`,
      validationMiddleware(CreateAdminDto, "body"),
      this.authController.signInAdmin.bind(this.authController)
    );
  }
}
export default AuthRouter;
