import { Router } from "express";
import { Routes } from "../../routes/route.interface";
import AuthController from "./auth.controller";
import validationMiddleware from "../../middlewares/validation.middleware";

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
  }
}
export default AuthRouter;
