import {Router} from "express";
import {Routes} from "../../routes/route.interface";
import authMiddleware from "../../middlewares/auth.middleware";
import ShippingController from "./shipping.controller";

class ShippingRouter implements Routes {
    public path = "/shipping";
    public router = Router();
    public shippingController = new ShippingController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            `${this.path}`,
            authMiddleware("admin"),
            this.shippingController.createShipping.bind(this.shippingController)
        );
        this.router.put(
            `${this.path}/:id`,
            authMiddleware("admin"),
            this.shippingController.updateShipping.bind(this.shippingController)
        );
        this.router.get(
            `${this.path}`,
            authMiddleware("all"),
            this.shippingController.getAllShippings.bind(this.shippingController)
        );
        this.router.get(
            `${this.path}/price`,
            authMiddleware("all"),
            this.shippingController.getShippingByType.bind(this.shippingController)
        );

        this.router.delete(
            `${this.path}/:id`,
            authMiddleware("admin"),
            this.shippingController.deleteShippingById.bind(this.shippingController)
        );
    }
}

export default ShippingRouter;
