import { Router } from "express";
import { Routes } from "../../routes/route.interface";
import authMiddleware from "../../middlewares/auth.middleware";
import ReceiptController from "./receipt.controller";

class ReceiptRouter implements Routes {
  public path = "/receipt";
  public router = Router();
  public receiptController = new ReceiptController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/send-card`,
      this.receiptController.createCard.bind(this.receiptController)
    );
  }
}
export default ReceiptRouter;
