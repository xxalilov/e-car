import { Cart } from "./cart.interface";
import { ResultInterface } from "../../utils/pagination";
declare class CartService {
    cart: typeof import("./cart.model").CartModel;
    user: typeof import("../Users/user.model").UserModel;
    product: typeof import("../Products/product.model").ProductModel;
    getAllCarts(page: number, pageSize: number): Promise<ResultInterface>;
    getUserCart(userId: string): Promise<Cart>;
    getCartById(cartId: string): Promise<Cart>;
    addProduct(productId: string, userId: string): Promise<Cart>;
    removeProduct(productId: string, userId: string): Promise<Cart>;
    updateProductQty(productId: string, quantity: number, userId: string): Promise<Cart>;
}
export default CartService;
