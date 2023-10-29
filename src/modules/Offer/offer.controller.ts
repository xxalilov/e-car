import {NextFunction, Request, Response} from "express";
import OfferService from "./offer.service";
import {RequestWithUser} from "../Auth/auth.interface";

class OfferController {
    private offerService = new OfferService();

    public async getAllOffers(req: Request, res: Response, next: NextFunction) {
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 10;
        try {
            const findAllOfferData = await this.offerService.getAllOffers(page, pageSize);
            res.status(200).json({...findAllOfferData, message: "findAll"});
        } catch (error) {
            next(error);
        }
    }

    public async createOffer(
        req: RequestWithUser,
        res: Response,
        next: NextFunction
    ) {
        try {
            const offerData = req.body;
            offerData.userId = req.user.id;
            const newOffer = await this.offerService.createOffer(offerData);
            res.status(201).json({data: newOffer, message: "created"});
        } catch (error) {
            next(error);
        }
    }

    public async deleteOfferById(req: Request, res: Response, next: NextFunction) {
        try {
            const deletedOfferData = await this.offerService.deleteOffer(
                req.params.id
            );
            res.status(200).json({data: deletedOfferData, message: "deleted"});
        } catch (error) {
            next(error);
        }
    }
}

export default OfferController;
