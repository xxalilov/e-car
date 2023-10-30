import { Routes } from "../../routes/route.interface";
import CartController from "./cart.controller";
declare class CartRouter implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    cartController: CartController;
    constructor();
    private initializeRoutes;
}
export default CartRouter;
