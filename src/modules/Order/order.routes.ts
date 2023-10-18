import {Router} from "express";
import {Routes} from "../../routes/route.interface";
import authMiddleware from "../../middlewares/auth.middleware";
import OrderController from "./order.controller";

class OrderRouter implements Routes {
    public path = "/order";
    public router = Router();
    public orderController = new OrderController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            `${this.path}/create-order`,
            authMiddleware("user"),
            // validationMiddleware(CreateCarDto, "body"),
            this.orderController.createOrder.bind(this.orderController)
        );

        // this.router.post(
        //     `${this.path}/remove-product`,
        //     authMiddleware("user"),
        //     // validationMiddleware(CreateCarDto, "body"),
        //     this.orderController.removeProduct.bind(this.orderController)
        // );

        this.router.get(
            `${this.path}`,
            authMiddleware("user"),
            // validationMiddleware(CreateCarDto, "body"),
            this.orderController.getUserOrders.bind(this.orderController)
        );
    }
}

export default OrderRouter;
