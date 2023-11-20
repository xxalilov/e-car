"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const auth_middleware_1 = tslib_1.__importDefault(require("../../middlewares/auth.middleware"));
const shipping_controller_1 = tslib_1.__importDefault(require("./shipping.controller"));
class ShippingRouter {
    constructor() {
        this.path = "/shipping";
        this.router = (0, express_1.Router)();
        this.shippingController = new shipping_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, (0, auth_middleware_1.default)("admin"), this.shippingController.createShipping.bind(this.shippingController));
        this.router.put(`${this.path}/:id`, (0, auth_middleware_1.default)("admin"), this.shippingController.updateShipping.bind(this.shippingController));
        this.router.get(`${this.path}`, (0, auth_middleware_1.default)("all"), this.shippingController.getAllShippings.bind(this.shippingController));
        this.router.get(`${this.path}/price`, (0, auth_middleware_1.default)("all"), this.shippingController.getShippingByType.bind(this.shippingController));
        this.router.delete(`${this.path}/:id`, (0, auth_middleware_1.default)("admin"), this.shippingController.deleteShippingById.bind(this.shippingController));
    }
}
exports.default = ShippingRouter;
//# sourceMappingURL=shipping.routes.js.map