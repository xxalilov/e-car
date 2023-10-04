import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "../../modules/Auth/auth.interface";
import { Photo, RequestWithFile } from "../../interfaces/file-upload.interface";
import CartService from "./cart.service";

class CartController {
  private cartService = new CartService();

  public async getUserCart(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user.id;
      const cart = await this.cartService.getUserCart(userId);
      res.status(200).json({ data: cart, message: "get" });
    } catch (error) {
      next(error);
    }
  }

  public async addProduct(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const productId = req.body.productId;
      const userId = req.user.id;
      const quantity = req.body.quantity;
      const addProduct = await this.cartService.addProduct(
        productId,
        userId,
        quantity
      );
      res.status(200).json({ data: addProduct, message: "added" });
    } catch (error) {
      next(error);
    }
  }

  public async removeProduct(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const productId = req.body.productId;
      const userId = req.user.id;
      const removedProduct = await this.cartService.removeProduct(
        productId,
        userId
      );
      res.status(200).json({ data: removedProduct, message: "removed" });
    } catch (error) {
      next(error);
    }
  }
}

export default CartController;
