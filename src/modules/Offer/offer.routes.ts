import {Router} from "express";
import {Routes} from "../../routes/route.interface";
import authMiddleware from "../../middlewares/auth.middleware";
import {upload} from "../../utils/file";
import OfferController from "./offer.controller";

class OfferRouter implements Routes {
    public path = "/offers";
    public router = Router();
    public offerController = new OfferController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            `${this.path}`,
            authMiddleware("user"),
            // validationMiddleware(CreateCarDto, "body"),
            upload.fields([{name: "photo", maxCount: 1}]),
            this.offerController.createOffer.bind(this.offerController)
        );
        this.router.get(
            `${this.path}`,
            authMiddleware("admin"),
            this.offerController.getAllOffers.bind(this.offerController)
        );

        this.router.delete(
            `${this.path}/:id`,
            authMiddleware("admin"),
            this.offerController.deleteOfferById.bind(this.offerController)
        );
    }
}

export default OfferRouter;
