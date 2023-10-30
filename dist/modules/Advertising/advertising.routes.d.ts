import { Routes } from "../../routes/route.interface";
import AdvertisingController from "./advertising.controller";
declare class AdvertisingRouter implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    advertisingController: AdvertisingController;
    constructor();
    private initializeRoutes;
}
export default AdvertisingRouter;
