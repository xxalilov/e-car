import { NextFunction, Request, Response } from "express";
import ReceiptService from "./receipt.service";

class ReceiptController {
  private receiptService = new ReceiptService();
  public async createCard(req: Request, res: Response, next: NextFunction) {
    try {
      // const ress = this.receiptService.pay();
      res.status(200).json({});
    } catch (error) {
      next(error);
    }
  }
}

export default ReceiptController;
