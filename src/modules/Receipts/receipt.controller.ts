import { NextFunction,Request, Response } from "express";
import ReceiptService from "./receipt.service";
import {RequestWithUser} from "../Auth/auth.interface";

class ReceiptController {
  private receiptService = new ReceiptService();
  public async createCard(req: RequestWithUser, res: Response, next: NextFunction) {
    const userId: string = req.user.id.toString();
    try {
      const response = await this.receiptService.addCard(parseInt(userId), req.body.card_number, req.body.card_expire);
      res.status(200).json({
        data: response,
        message: "Send code"
      });
    } catch (error) {
      next(error);
    }
  }

  public async verifyConfirmation(req: RequestWithUser, res: Response, next: NextFunction) {
    const userId: string = req.user.id.toString();
    try {
      const response = await this.receiptService.verifyCode(userId, req.body.code);
      res.status(200).json({
        data: response,
        message: "Verify Code"
      });
    }catch (error) {
      next(error);
    }
  }

  public async checkCard(req: RequestWithUser, res: Response, next: NextFunction){
    const userId: string = req.user.id.toString();
    try {
      const response = this.receiptService.checkCard(userId);
      res.status(200).json({});
    }catch (error) {
      next(error);
    }
  }

  public async  createReceipt(req: RequestWithUser, res: Response, next: NextFunction) {
    const userId: string = req.user.id.toString();
    try {
      const response = this.receiptService.createReceipt(userId, req.body.shippingAddress);
      res.status(201).json({});
    }catch (error) {
      next(error);
    }
  }

  public async payReceipt(req: RequestWithUser, res: Response, next: NextFunction) {
    const userId: string = req.user.id.toString();
    try {
      const response = this.receiptService.payReceipts(userId, req.body.receiptId);
      res.status(200).json({});
    }catch (error) {
      next(error);
    }
  }
}

export default ReceiptController;
