import { NextFunction, Request, Response } from "express";
declare class ShippingController {
    private shippingService;
    getAllShippings(req: Request, res: Response, next: NextFunction): Promise<void>;
    getShippingByType(req: Request, res: Response, next: NextFunction): Promise<void>;
    createShipping(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateShipping(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteShippingById(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export default ShippingController;
