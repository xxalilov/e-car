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
      `${this.path}/add-card`,
        authMiddleware('user'),
      this.receiptController.createCard.bind(this.receiptController)
    );
    this.router.post(
        `${this.path}/verify-confirmation`,
        authMiddleware('user'),
        this.receiptController.verifyConfirmation.bind(this.receiptController)
    );
    this.router.get(
        `${this.path}/check-card`,
        authMiddleware('user'),
        this.receiptController.checkCard.bind(this.receiptController)
    );
    this.router.post(
        `${this.path}/create-receipt`,
        authMiddleware('user'),
        this.receiptController.createReceipt.bind(this.receiptController)
    );
    this.router.post(
        `${this.path}/pay-receipt`,
        authMiddleware('user'),
        this.receiptController.payReceipt.bind(this.receiptController)
    );
  }
}
export default ReceiptRouter;
