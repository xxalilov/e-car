import {models} from "../../utils/database";
import PaginationHelper, {ResultInterface} from "../../utils/pagination";
import {isEmpty} from "../../utils/isEpmty";
import {HttpException} from "../../exceptions/HttpException";
import {Order} from "./order.interface";
import {CreateOrderDto} from "./order.dto";

class OrderService {
    public order = models.Order;
    public cart = models.Cart;
    public user = models.User;
    public product = models.Product;

    public async getUserOrders(userId: string): Promise<Order[]> {
        if (isEmpty(userId)) throw new HttpException(400, "userId is empty");
        const user = await this.user.findByPk(userId);
        if (!user) throw new HttpException(400, "User not found");
        const order = await this.order.findAll({
            where: {userId},
            include: [
                {
                    model: this.product,
                    as: "products",
                    through: {attributes: ["quantity"], as: "orderItem"},
                },
            ],
        });
        return order;
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
        console.log(products[0].dataValues.CartItemModel.dataValues);

        if (!userCart) throw new HttpException(400, "userCart not found");
        const order = await this.order.create({total_price: userCart.totalPrice, userId, ...orderData});
        // const order = await this.order.findByPk(1)
        for(let product of products) {
            order.addProduct(product, product.dataValues.CartItemModel.dataValues.quantity);
        }
        // if (!order) throw new HttpException(500, "Server error");
        // await order.addProduct(findProduct, quantity);

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
