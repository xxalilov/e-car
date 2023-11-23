import {models} from "../../utils/database";
import {isEmpty} from "../../utils/isEpmty";
import {HttpException} from "../../exceptions/HttpException";
import {Order} from "./order.interface";
import {CreateOrderDto} from "./order.dto";
import PaginationHelper, {ResultInterface} from "../../utils/pagination";
import PaymeService from "../Payme/payme.service";

class OrderService {
    public order = models.Order;
    public cart = models.Cart;
    public user = models.User;
    public product = models.Product;
    public shipping = models.Shipping;
    public paymeService = new PaymeService();

    public async getUserOrders(page: number, pageSize: number, userId: string, type: string): Promise<ResultInterface> {
        const paginationHelper = new PaginationHelper(this.order);
        if (isEmpty(userId)) throw new HttpException(400, "userId is empty");
        const user = await this.user.findByPk(userId);
        if (!user) throw new HttpException(400, "User not found");
        const attributes = ["id", "shipping_type", "shipping_address", "shipping_price", "shipping_status", "total_price", "payment_type", "is_paid", "createdAt"];
        if (type === "history") {
            return await paginationHelper.paginate(page, pageSize, {
                userId,
                shipping_status: true
            }, attributes, [], [
                {
                    model: this.product,
                    as: "products",
                    through: {attributes: ["quantity"], as: "orderItem"},
                },
            ]);
        } else if (type === "pending") {
            return await paginationHelper.paginate(page, pageSize, {
                userId,
                shipping_status: false
            }, attributes, [], [
                {
                    model: this.product,
                    as: "products",
                    through: {attributes: ["quantity"], as: "orderItem"},
                },
            ]);
        } else {
            return await paginationHelper.paginate(page, pageSize, {userId}, attributes, [], [
                {
                    model: this.product,
                    as: "products",
                    through: {attributes: ["quantity"], as: "orderItem"},
                },
            ]);
        }
    }

    public async getOrders(page: number, pageSize: number, type: string, searchData: string): Promise<ResultInterface> {
        const paginationHelper = new PaginationHelper(this.order);
        const attributes = ["id", "shipping_type", "shipping_address", "shipping_price", "shipping_status", "total_price", "payment_type", "is_paid", "createdAt"];
        if (type === "history") {
            return await paginationHelper.paginate(page, pageSize, {
                shipping_status: true,
            }, attributes, [], [
                {
                    model: this.product,
                    as: "products",
                    through: {attributes: ["quantity"], as: "orderItem"},
                },
            ]);
        } else if (type === "pending") {
            return await paginationHelper.paginate(page, pageSize, {
                shipping_status: false,
            }, attributes, [], [
                {
                    model: this.product,
                    as: "products",
                    through: {attributes: ["quantity"], as: "orderItem"},
                },
            ]);
        } else if (type === "search") {
            return await paginationHelper.paginate(page, pageSize, {
                id: searchData
            }, attributes, [], [
                {
                    model: this.product,
                    as: "products",
                    through: {attributes: ["quantity"], as: "orderItem"},
                },
            ]);
        } else {
            return await paginationHelper.paginate(page, pageSize, {}, attributes, [], [
                {
                    model: this.product,
                    as: "products",
                    through: {attributes: ["quantity"], as: "orderItem"},
                },
            ]);
        }
    }

    public async createOrder(
        orderData: CreateOrderDto,
        userId: string,
    ): Promise<Order> {
        if (isEmpty(orderData))
            throw new HttpException(400, "Please input orderData");
        const userCart = await this.cart.findOne({
            where: {userId},
        });
        const products = await userCart.getProducts();

        if (!userCart) throw new HttpException(400, "userCart not found");
        const shippingType = await this.shipping.findOne({where: {type: orderData.shipping_type}});
        if (!shippingType) throw new HttpException(400, "Shipping type not found");
        const order = await this.order.create({
            total_price: userCart.totalPrice + shippingType.price,
            userId,
            shipping_price: shippingType.price, ...orderData
        });
        for (let product of products) {
            order.addProduct(product, product.dataValues.CartItemModel.dataValues.quantity);
            userCart.removeProduct(product);
        }

        await userCart.update({totalPrice: 0});

        return order;
    }

    public async payOrder(userId: string, card_number: string, card_expire: string): Promise<{
        sent: boolean,
        phone: string,
        wait: number,
        token: string
    }> {
        const cardToken = await this.paymeService.createCard(card_number, card_expire, userId);

        const response = await this.paymeService.getVerifyCode(userId, cardToken);
        return {...response, token: cardToken}
    }

    public async confirmPayOrder(orderId: string, userId: string, token: string, code: string): Promise<Order> {
        const user = await this.user.findByPk(userId);
        if (isEmpty(orderId))
            throw new HttpException(400, "Please input orderId");
        const findOrder = await this.order.findByPk(orderId);

        if (!findOrder) throw new HttpException(400, "Order not found");
        const order = await this.order.findOne({where: {userId}});

        if (!order) throw new HttpException(500, "Server error");
        // await this.paymeService.verify(userId, user.card, code);

        await order.update({is_paid: true});

        return order;
    }

    public async updateOrder(orderId: string, updateData): Promise<Order> {
        if (isEmpty(orderId))
            throw new HttpException(400, "Please input orderId");
        const findOrder = await this.order.findByPk(orderId);

        if (!findOrder) throw new HttpException(400, "Order not found");

        return await findOrder.update(updateData);
    }

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

export default OrderService;
