"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const database_1 = require("../../utils/database");
const isEpmty_1 = require("../../utils/isEpmty");
const HttpException_1 = require("../../exceptions/HttpException");
const pagination_1 = tslib_1.__importDefault(require("../../utils/pagination"));
const payme_service_1 = tslib_1.__importDefault(require("../Payme/payme.service"));
class OrderService {
    constructor() {
        this.order = database_1.models.Order;
        this.cart = database_1.models.Cart;
        this.user = database_1.models.User;
        this.product = database_1.models.Product;
        this.paymeService = new payme_service_1.default();
        // public async removeProduct(productId: string, userId: string): Promise<order> {
        //     if (isEmpty(productId))
        //         throw new HttpException(400, "Please input productId");
        //     const findProduct = await this.product.findByPk(productId);
        //     if (!findProduct) throw new HttpException(400, "Product not found");
        //     const order = await this.order.findOne({ where: { userId } });
        //     if (!order) throw new HttpException(500, "Server error");
        //
        //     await order.removeProduct(findProduct);
        //
        //     return order;
        // }
    }
    async getUserOrders(page, pageSize, userId, type) {
        const paginationHelper = new pagination_1.default(this.order);
        if ((0, isEpmty_1.isEmpty)(userId))
            throw new HttpException_1.HttpException(400, "userId is empty");
        const user = await this.user.findByPk(userId);
        if (!user)
            throw new HttpException_1.HttpException(400, "User not found");
        const attributes = ["id", "shipping_type", "shipping_address", "shipping_price", "shipping_status", "total_price", "payment_type", "is_paid", "createdAt"];
        if (type === "history") {
            return await paginationHelper.paginate(page, pageSize, {
                userId,
                shipping_status: true
            }, attributes, [], [
                {
                    model: this.product,
                    as: "products",
                    through: { attributes: ["quantity"], as: "orderItem" },
                },
            ]);
        }
        else if (type === "pending") {
            return await paginationHelper.paginate(page, pageSize, {
                userId,
                shipping_status: false
            }, attributes, [], [
                {
                    model: this.product,
                    as: "products",
                    through: { attributes: ["quantity"], as: "orderItem" },
                },
            ]);
        }
        else {
            return await paginationHelper.paginate(page, pageSize, { userId }, attributes, [], [
                {
                    model: this.product,
                    as: "products",
                    through: { attributes: ["quantity"], as: "orderItem" },
                },
            ]);
        }
    }
    async getOrders(page, pageSize, type, searchData) {
        const paginationHelper = new pagination_1.default(this.order);
        const attributes = ["id", "shipping_type", "shipping_address", "shipping_price", "shipping_status", "total_price", "payment_type", "is_paid", "createdAt"];
        if (type === "history") {
            return await paginationHelper.paginate(page, pageSize, {
                shipping_status: true,
            }, attributes, [], [
                {
                    model: this.product,
                    as: "products",
                    through: { attributes: ["quantity"], as: "orderItem" },
                },
            ]);
        }
        else if (type === "pending") {
            return await paginationHelper.paginate(page, pageSize, {
                shipping_status: false,
            }, attributes, [], [
                {
                    model: this.product,
                    as: "products",
                    through: { attributes: ["quantity"], as: "orderItem" },
                },
            ]);
        }
        else if (type === "search") {
            return await paginationHelper.paginate(page, pageSize, {
                id: searchData
            }, attributes, [], [
                {
                    model: this.product,
                    as: "products",
                    through: { attributes: ["quantity"], as: "orderItem" },
                },
            ]);
        }
        else {
            return await paginationHelper.paginate(page, pageSize, {}, attributes, [], [
                {
                    model: this.product,
                    as: "products",
                    through: { attributes: ["quantity"], as: "orderItem" },
                },
            ]);
        }
    }
    async createOrder(orderData, userId) {
        if ((0, isEpmty_1.isEmpty)(orderData))
            throw new HttpException_1.HttpException(400, "Please input orderData");
        const userCart = await this.cart.findOne({
            where: { userId },
        });
        const products = await userCart.getProducts();
        if (!userCart)
            throw new HttpException_1.HttpException(400, "userCart not found");
        const order = await this.order.create(Object.assign({ total_price: userCart.totalPrice, userId }, orderData));
        for (let product of products) {
            order.addProduct(product, product.dataValues.CartItemModel.dataValues.quantity);
            userCart.removeProduct(product);
        }
        await userCart.update({ totalPrice: 0 });
        return order;
    }
    async payOrder(userId, card_number, card_expire) {
        const cardToken = await this.paymeService.createCard(card_number, card_expire, userId);
        const response = await this.paymeService.getVerifyCode(userId, cardToken);
        return Object.assign(Object.assign({}, response), { token: cardToken });
    }
    async confirmPayOrder(orderId, userId, token, code) {
        const user = await this.user.findByPk(userId);
        if ((0, isEpmty_1.isEmpty)(orderId))
            throw new HttpException_1.HttpException(400, "Please input orderId");
        const findOrder = await this.order.findByPk(orderId);
        if (!findOrder)
            throw new HttpException_1.HttpException(400, "Order not found");
        const order = await this.order.findOne({ where: { userId } });
        if (!order)
            throw new HttpException_1.HttpException(500, "Server error");
        // await this.paymeService.verify(userId, user.card, code);
        await order.update({ is_paid: true });
        return order;
    }
    async updateOrder(orderId, updateData) {
        if ((0, isEpmty_1.isEmpty)(orderId))
            throw new HttpException_1.HttpException(400, "Please input orderId");
        const findOrder = await this.order.findByPk(orderId);
        if (!findOrder)
            throw new HttpException_1.HttpException(400, "Order not found");
        return await findOrder.update(updateData);
    }
}
exports.default = OrderService;
//# sourceMappingURL=order.service.js.map