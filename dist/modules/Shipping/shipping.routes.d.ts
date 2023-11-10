import { Routes } from "../../routes/route.interface";
import ShippingController from "./shipping.controller";
declare class ShippingRouter implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    shippingController: ShippingController;
    constructor();
    private initializeRoutes;
}
export default ShippingRouter;
