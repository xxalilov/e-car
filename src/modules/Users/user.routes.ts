import { Router } from "express";
import { Routes } from "../../routes/route.interface";
import UserController from "./user.controller";
import validationMiddleware from "../../middlewares/validation.middleware";
import { UpdateUserDto } from "./user.dto";
import authMiddleware from "../../middlewares/auth.middleware";
import { upload } from "../../utils/file";

class UserRouter implements Routes {
  public path = "/user";
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.put(
      `${this.path}`,
      authMiddleware("user"),
      validationMiddleware(UpdateUserDto, "body"),
      upload.fields([{ name: "photo", maxCount: 1 }]),
      this.userController.updateUser.bind(this.userController)
    );
    this.router.get(
      `${this.path}`,
      authMiddleware("admin"),
      this.userController.getAllUsers.bind(this.userController)
    );
    this.router.get(
      `${this.path}/:id`,
      this.userController.getUserById.bind(this.userController)
    );
  }
}

export default UserRouter;
