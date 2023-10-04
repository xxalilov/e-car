"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const auth_middleware_1 = tslib_1.__importDefault(require("../../middlewares/auth.middleware"));
const cart_controller_1 = tslib_1.__importDefault(require("./cart.controller"));
class CartRouter {
    constructor() {
        this.path = "/cart";
        this.router = (0, express_1.Router)();
        this.cartController = new cart_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/add-product`, (0, auth_middleware_1.default)("user"), 
        // validationMiddleware(CreateCarDto, "body"),
        this.cartController.addProduct.bind(this.cartController));
        this.router.post(`${this.path}/remove-product`, (0, auth_middleware_1.default)("user"), 
        // validationMiddleware(CreateCarDto, "body"),
        this.cartController.removeProduct.bind(this.cartController));
        this.router.get(`${this.path}`, (0, auth_middleware_1.default)("user"), 
        // validationMiddleware(CreateCarDto, "body"),
        this.cartController.getUserCart.bind(this.cartController));
    }
}
exports.default = CartRouter;
//# sourceMappingURL=cart.routes.js.map