import { Order } from "./order.interface";
import { CreateOrderDto } from "./order.dto";
import { ResultInterface } from "../../utils/pagination";
import PaymeService from "../Payme/payme.service";
declare class OrderService {
    order: typeof import("./order.model").OrderModel;
    cart: typeof import("../Cart/cart.model").CartModel;
    user: typeof import("../Users/user.model").UserModel;
    product: typeof import("../Products/product.model").ProductModel;
    paymeService: PaymeService;
    getUserOrders(page: number, pageSize: number, userId: string, type: string): Promise<ResultInterface>;
    createOrder(orderData: CreateOrderDto, userId: string): Promise<Order>;
    payOrder(userId: string, card_number: string, card_expire: string): Promise<{
        sent: boolean;
        phone: string;
        wait: number;
        token: string;
    }>;
    confirmPayOrder(orderId: string, userId: string, token: string, code: string): Promise<Order>;
}
export default OrderService;
