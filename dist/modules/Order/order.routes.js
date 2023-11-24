"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const auth_middleware_1 = tslib_1.__importDefault(require("../../middlewares/auth.middleware"));
const order_controller_1 = tslib_1.__importDefault(require("./order.controller"));
class OrderRouter {
    constructor() {
        this.path = "/order";
        this.router = (0, express_1.Router)();
        this.orderController = new order_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/create-order`, (0, auth_middleware_1.default)("user"), 
        // validationMiddleware(CreateCarDto, "body"),
        this.orderController.createOrder.bind(this.orderController));
        this.router.post(`${this.path}/send-card`, (0, auth_middleware_1.default)("user"), this.orderController.payOrder.bind(this.orderController));
        this.router.post(`${this.path}/pay-order`, (0, auth_middleware_1.default)("user"), this.orderController.verifyCode.bind(this.orderController));
        // this.router.post(
        //     `${this.path}/remove-product`,
        //     authMiddleware("user"),
        //     // validationMiddleware(CreateCarDto, "body"),
        //     this.orderController.removeProduct.bind(this.orderController)
        // );
        this.router.get(`${this.path}/admin`, (0, auth_middleware_1.default)("admin"), 
        // validationMiddleware(CreateCarDto, "body"),
        this.orderController.getOrders.bind(this.orderController));
        this.router.get(`${this.path}`, (0, auth_middleware_1.default)("user"), 
        // validationMiddleware(CreateCarDto, "body"),
        this.orderController.getUserOrders.bind(this.orderController));
        this.router.put(`${this.path}/:id`, (0, auth_middleware_1.default)("admin"), 
        // validationMiddleware(CreateCarDto, "body"),
        this.orderController.updateOrder.bind(this.orderController));
        this.router.delete(`${this.path}/:id`, (0, auth_middleware_1.default)("all"), 
        // validationMiddleware(CreateCarDto, "body"),
        this.orderController.removeOrder.bind(this.orderController));
    }
}
exports.default = OrderRouter;
//# sourceMappingURL=order.routes.js.map