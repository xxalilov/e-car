import { Router } from "express";
import { Routes } from "../../routes/route.interface";
import validationMiddleware from "../../middlewares/validation.middleware";
import authMiddleware from "../../middlewares/auth.middleware";
import { upload } from "../../utils/file";
import CartController from "./cart.controller";

class CartRouter implements Routes {
  public path = "/cart";
  public router = Router();
  public cartController = new CartController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/add-product`,
      authMiddleware("user"),
      // validationMiddleware(CreateCarDto, "body"),
      this.cartController.addProduct.bind(this.cartController)
    );

    this.router.post(
      `${this.path}/remove-product`,
      authMiddleware("user"),
      // validationMiddleware(CreateCarDto, "body"),
      this.cartController.removeProduct.bind(this.cartController)
    );

    this.router.get(
      `${this.path}`,
      authMiddleware("user"),
      // validationMiddleware(CreateCarDto, "body"),
      this.cartController.getUserCart.bind(this.cartController)
    );
  }
}

export default CartRouter;
