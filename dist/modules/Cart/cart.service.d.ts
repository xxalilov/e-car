import { Cart } from "./cart.interface";
declare class CartService {
    cart: typeof import("./cart.model").CartModel;
    user: typeof import("../Users/user.model").UserModel;
    product: typeof import("../Products/product.model").ProductModel;
    getUserCart(userId: string): Promise<Cart>;
    addProduct(productId: string, userId: string): Promise<Cart>;
    removeProduct(productId: string, userId: string): Promise<Cart>;
}
export default CartService;
