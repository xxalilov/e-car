"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const database_1 = require("../../utils/database");
const pagination_1 = tslib_1.__importDefault(require("../../utils/pagination"));
const isEpmty_1 = require("../../utils/isEpmty");
const HttpException_1 = require("../../exceptions/HttpException");
class CartService {
    constructor() {
        this.cart = database_1.models.Cart;
        this.user = database_1.models.User;
        this.product = database_1.models.Product;
    }
    async getAllCarts(page, pageSize) {
        const paginationHelper = new pagination_1.default(this.cart);
        const result = await paginationHelper.paginate(page, pageSize);
        return result;
    }
    async getUserCart(userId) {
        if ((0, isEpmty_1.isEmpty)(userId))
            throw new HttpException_1.HttpException(400, "userId is empty");
        const user = await this.user.findByPk(userId);
        if (!user)
            throw new HttpException_1.HttpException(400, "User not found");
        const cart = await this.cart.findOne({ where: { userId } });
        return cart;
    }
    async getCartById(cartId) {
        if ((0, isEpmty_1.isEmpty)(cartId))
            throw new HttpException_1.HttpException(400, "cartId is empty");
        const cart = await this.cart.findByPk(cartId);
        if (!cart)
            throw new HttpException_1.HttpException(400, "Cart not found");
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
        await cart.update({
            products: [...cart.products, { productId, quantity: 1 }],
        });
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
        const cartItems = cart.products;
        const updatedCartItems = cartItems.filter((item) => item.productId !== productId);
        await cart.update({
            products: updatedCartItems,
        });
        return cart;
    }
    async updateProductQty(productId, quantity, userId) {
        if ((0, isEpmty_1.isEmpty)(productId))
            throw new HttpException_1.HttpException(400, "Please input productId");
        const findProduct = await this.product.findByPk(productId);
        if (!findProduct)
            throw new HttpException_1.HttpException(400, "Product not found");
        const cart = await this.cart.findOne({ where: { userId } });
        if (!cart)
            throw new HttpException_1.HttpException(500, "Server error");
        const cartItems = cart.products;
        const updatedCartItemIndex = cartItems.findIndex((product) => product.productId === productId);
        cartItems[updatedCartItemIndex].quantity = quantity;
        await cart.update({
            products: cartItems,
        });
        return cart;
    }
}
exports.default = CartService;
//# sourceMappingURL=cart.service.js.map