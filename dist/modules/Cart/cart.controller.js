"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cart_service_1 = tslib_1.__importDefault(require("./cart.service"));
class CartController {
    constructor() {
        this.cartService = new cart_service_1.default();
    }
    async getUserCart(req, res, next) {
        try {
            const userId = req.user.id;
            const cart = await this.cartService.getUserCart(userId.toString());
            res.status(200).json({ data: cart, message: "get" });
        }
        catch (error) {
            next(error);
        }
    }
    async addProduct(req, res, next) {
        try {
            const productId = req.body.productId;
            const userId = req.user.id.toString();
            const quantity = req.body.quantity;
            const addProduct = await this.cartService.addProduct(productId, userId, quantity);
            res.status(200).json({ data: addProduct, message: "added" });
        }
        catch (error) {
            next(error);
        }
    }
    async removeProduct(req, res, next) {
        try {
            const productId = req.body.productId;
            const userId = req.user.id;
            const removedProduct = await this.cartService.removeProduct(productId, userId.toString());
            res.status(200).json({ data: removedProduct, message: "removed" });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = CartController;
//# sourceMappingURL=cart.controller.js.map