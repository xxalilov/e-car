import { NextFunction, Response } from "express";
import { RequestWithUser } from "../Auth/auth.interface";
declare class ReceiptController {
    private receiptService;
    createCard(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
    verifyConfirmation(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
    checkCard(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
    createReceipt(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
    payReceipt(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
}
export default ReceiptController;
