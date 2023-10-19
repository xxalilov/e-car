import {models} from "../../utils/database";
import {isEmpty} from "../../utils/isEpmty";
import {HttpException} from "../../exceptions/HttpException";
import {Order} from "./order.interface";
import {CreateOrderDto} from "./order.dto";
import PaginationHelper, {ResultInterface} from "../../utils/pagination";

class OrderService {
    public order = models.Order;
    public cart = models.Cart;
    public user = models.User;
    public product = models.Product;

    public async getUserOrders(page: number, pageSize: number, userId: string, type: string): Promise<ResultInterface> {
        const paginationHelper = new PaginationHelper(this.order);
        if (isEmpty(userId)) throw new HttpException(400, "userId is empty");
        const user = await this.user.findByPk(userId);
        if (!user) throw new HttpException(400, "User not found");
        const attributes = ["id", "shipping_type", "shipping_address", "shipping_price", "shipping_status", "total_price", "payment_type", "is_paid"];
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
        const order = await this.order.create({total_price: userCart.totalPrice, userId, ...orderData});
        for (let product of products) {
            order.addProduct(product, product.dataValues.CartItemModel.dataValues.quantity);
        }

        return order;
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
