import { models } from "../../utils/database";
import { Cart } from "./cart.interface";
import PaginationHelper, { ResultInterface } from "../../utils/pagination";
import { isEmpty } from "../../utils/isEpmty";
import { HttpException } from "../../exceptions/HttpException";

class CartService {
  public cart = models.Cart;
  public user = models.User;
  public product = models.Product;

  public async getUserCart(userId: string): Promise<Cart> {
    if (isEmpty(userId)) throw new HttpException(400, "userId is empty");
    const user = await this.user.findByPk(userId);
    if (!user) throw new HttpException(400, "User not found");
    const cart = await this.cart.findOne({
      where: { userId },
      include: [
        {
          model: this.product,
          as: "products",
          through: { attributes: ["quantity"], as: "cartItem" },
        },
      ],
    });
    return cart;
  }

  public async addProduct(productId: string, userId: string): Promise<Cart> {
    if (isEmpty(productId))
      throw new HttpException(400, "Please input productId");
    const findProduct = await this.product.findByPk(productId);
    if (!findProduct) throw new HttpException(400, "Product not found");
    const cart = await this.cart.findOne({ where: { userId } });
    if (!cart) throw new HttpException(500, "Server error");
    await cart.addProduct(findProduct, 2);

    return cart;
  }

  public async removeProduct(productId: string, userId: string): Promise<Cart> {
    if (isEmpty(productId))
      throw new HttpException(400, "Please input productId");
    const findProduct = await this.product.findByPk(productId);
    if (!findProduct) throw new HttpException(400, "Product not found");
    const cart = await this.cart.findOne({ where: { userId } });
    if (!cart) throw new HttpException(500, "Server error");

    await cart.removeProduct(findProduct);

    return cart;
  }
}

export default CartService;
