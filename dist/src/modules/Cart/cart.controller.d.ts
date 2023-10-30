import { NextFunction, Response } from "express";
import { RequestWithUser } from "../../modules/Auth/auth.interface";
declare class CartController {
    private cartService;
    getUserCart(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
    addProduct(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
    removeProduct(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
}
export default CartController;
