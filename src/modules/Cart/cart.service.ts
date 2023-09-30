import { models } from "../../utils/database";
import { Cart } from "./cart.interface";
import PaginationHelper, { ResultInterface } from "../../utils/pagination";
import { isEmpty } from "../../utils/isEpmty";
import { HttpException } from "../../exceptions/HttpException";

class CartService {
  public cart = models.Cart;
  public user = models.User;
  public product = models.Product;

  public async getAllCarts(
    page: number,
    pageSize: number
  ): Promise<ResultInterface> {
    const paginationHelper = new PaginationHelper(this.cart);
    const result = await paginationHelper.paginate(page, pageSize);
    return result;
  }

  public async getUserCart(userId: string): Promise<Cart> {
    if (isEmpty(userId)) throw new HttpException(400, "userId is empty");
    const user = await this.user.findByPk(userId);
    if (!user) throw new HttpException(400, "User not found");
    const cart = await this.cart.findOne({ where: { userId } });
    return cart;
  }

  public async getCartById(cartId: string): Promise<Cart> {
    if (isEmpty(cartId)) throw new HttpException(400, "cartId is empty");
    const cart: Cart = await this.cart.findByPk(cartId);
    if (!cart) throw new HttpException(400, "Cart not found");
    return cart;
  }

  public async addProduct(productId: string, userId: string): Promise<Cart> {
    if (isEmpty(productId))
      throw new HttpException(400, "Please input productId");
    const findProduct = await this.product.findByPk(productId);
    if (!findProduct) throw new HttpException(400, "Product not found");
    const cart = await this.cart.findOne({ where: { userId } });
    if (!cart) throw new HttpException(500, "Server error");
    await cart.update({
      products: [...cart.products, { productId, quantity: 1 }],
    });

    return cart;
  }

  public async removeProduct(productId: string, userId: string): Promise<Cart> {
    if (isEmpty(productId))
      throw new HttpException(400, "Please input productId");
    const findProduct = await this.product.findByPk(productId);
    if (!findProduct) throw new HttpException(400, "Product not found");
    const cart = await this.cart.findOne({ where: { userId } });
    if (!cart) throw new HttpException(500, "Server error");

    const cartItems = cart.products;

    const updatedCartItems = cartItems.filter(
      (item) => item.productId !== productId
    );

    await cart.update({
      products: updatedCartItems,
    });

    return cart;
  }

  public async updateProductQty(
    productId: string,
    quantity: number,
    userId: string
  ): Promise<Cart> {
    if (isEmpty(productId))
      throw new HttpException(400, "Please input productId");
    const findProduct = await this.product.findByPk(productId);
    if (!findProduct) throw new HttpException(400, "Product not found");
    const cart = await this.cart.findOne({ where: { userId } });
    if (!cart) throw new HttpException(500, "Server error");

    const cartItems = cart.products;

    const updatedCartItemIndex = cartItems.findIndex(
      (product) => product.productId === productId
    );
    cartItems[updatedCartItemIndex].quantity = quantity;

    await cart.update({
      products: cartItems,
    });

    return cart;
  }
}

export default CartService;
