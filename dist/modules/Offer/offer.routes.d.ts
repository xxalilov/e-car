import { Routes } from "../../routes/route.interface";
import OfferController from "./offer.controller";
declare class OfferRouter implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    offerController: OfferController;
    constructor();
    private initializeRoutes;
}
export default OfferRouter;
