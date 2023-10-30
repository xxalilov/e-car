import { Routes } from "../../routes/route.interface";
import OrderController from "./order.controller";
declare class OrderRouter implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    orderController: OrderController;
    constructor();
    private initializeRoutes;
}
export default OrderRouter;
