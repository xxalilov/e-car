import { Router } from "express";
import { Routes } from "../../routes/route.interface";
import validationMiddleware from "../../middlewares/validation.middleware";
import authMiddleware from "../../middlewares/auth.middleware";
import { upload } from "../../utils/file";
import TypeOfProductController from "./typeOfProduct.controller";

class TypeOfProductRouter implements Routes {
  public path = "/types-of-products";
  public router = Router();
  public typesOfProductController = new TypeOfProductController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      authMiddleware("admin"),
      // validationMiddleware(CreateTypeOfWorkshopDto, "body"),
      upload.fields([{ name: "photo", maxCount: 1 }]),
      this.typesOfProductController.createTypeOfProduct.bind(
        this.typesOfProductController
      )
    );
    this.router.delete(
      `${this.path}/:id`,
      authMiddleware("admin"),
      this.typesOfProductController.deleteTypeOfProduct.bind(
        this.typesOfProductController
      )
    );
    this.router.get(
      `${this.path}`,
      authMiddleware("all"),
      this.typesOfProductController.getAllTypeOfProduct.bind(
        this.typesOfProductController
      )
    );
  }
}

export default TypeOfProductRouter;
