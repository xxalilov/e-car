"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../utils/database");
const isEpmty_1 = require("../../utils/isEpmty");
const HttpException_1 = require("../../exceptions/HttpException");
class CartService {
    constructor() {
        this.cart = database_1.models.Cart;
        this.user = database_1.models.User;
        this.product = database_1.models.Product;
    }
    async getUserCart(userId) {
        if ((0, isEpmty_1.isEmpty)(userId))
            throw new HttpException_1.HttpException(400, "userId is empty");
        const user = await this.user.findByPk(userId);
        if (!user)
            throw new HttpException_1.HttpException(400, "User not found");
        const cart = await this.cart.findOne({
            where: { userId },
            include: [
                {
                    model: this.product,
                    as: "products",
                    through: { attributes: ["quantity"], as: "cartItem" },
                },
            ],
        });
        return cart;
    }
    async addProduct(productId, userId) {
        if ((0, isEpmty_1.isEmpty)(productId))
            throw new HttpException_1.HttpException(400, "Please input productId");
        const findProduct = await this.product.findByPk(productId);
        if (!findProduct)
            throw new HttpException_1.HttpException(400, "Product not found");
        const cart = await this.cart.findOne({ where: { userId } });
        if (!cart)
            throw new HttpException_1.HttpException(500, "Server error");
        await cart.addProduct(findProduct, 2);
        return cart;
    }
    async removeProduct(productId, userId) {
        if ((0, isEpmty_1.isEmpty)(productId))
            throw new HttpException_1.HttpException(400, "Please input productId");
        const findProduct = await this.product.findByPk(productId);
        if (!findProduct)
            throw new HttpException_1.HttpException(400, "Product not found");
        const cart = await this.cart.findOne({ where: { userId } });
        if (!cart)
            throw new HttpException_1.HttpException(500, "Server error");
        await cart.removeProduct(findProduct);
        return cart;
    }
}
exports.default = CartService;
//# sourceMappingURL=cart.service.js.map