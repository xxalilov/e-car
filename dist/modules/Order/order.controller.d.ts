import { NextFunction, Response } from "express";
import { RequestWithUser } from "../../modules/Auth/auth.interface";
declare class OrderController {
    private orderService;
    getUserOrders(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
    getOrders(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
    createOrder(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
    payOrder(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
    updateOrder(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
    verifyCode(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
    removeOrder(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
}
export default OrderController;
