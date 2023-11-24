import { Order } from "./order.interface";
import { CreateOrderDto } from "./order.dto";
import { ResultInterface } from "../../utils/pagination";
import PaymeService from "../Payme/payme.service";
declare class OrderService {
    order: typeof import("./order.model").OrderModel;
    cart: typeof import("../Cart/cart.model").CartModel;
    user: typeof import("../Users/user.model").UserModel;
    product: typeof import("../Products/product.model").ProductModel;
    shipping: typeof import("../Shipping/shipping.model").ShippingModel;
    paymeService: PaymeService;
    getUserOrders(page: number, pageSize: number, userId: string, type: string): Promise<ResultInterface>;
    getOrders(page: number, pageSize: number, type: string, searchData: string): Promise<ResultInterface>;
    createOrder(orderData: CreateOrderDto, userId: string): Promise<Order>;
    payOrder(userId: string, card_number: string, card_expire: string): Promise<{
        sent: boolean;
        phone: string;
        wait: number;
        token: string;
    }>;
    confirmPayOrder(orderId: string, userId: string, token: string, code: string): Promise<Order>;
    updateOrder(orderId: string, updateData: any): Promise<Order>;
    removeOrder(orderId: string): Promise<Order>;
}
export default OrderService;
