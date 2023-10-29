import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "../Auth/auth.interface";
declare class OfferController {
    private offerService;
    getAllOffers(req: Request, res: Response, next: NextFunction): Promise<void>;
    createOffer(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
    deleteOfferById(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export default OfferController;
