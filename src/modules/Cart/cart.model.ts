import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { Cart } from "./cart.interface";
import { ProductModel } from "../../modules/Products/product.model";

export type CartCreationAttributes = Optional<
  Cart,
  "id" | "userId" | "products"
>;

export class CartModel
  extends Model<Cart, CartCreationAttributes>
  implements Cart
{
  public id: number;
  public products: { productId: string; quantity: number }[];
  public userId: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof CartModel {
  CartModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      products: {
        type: DataTypes.ARRAY(DataTypes.JSON()),
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "carts",
      sequelize,
    }
  );

  CartModel.hasMany(ProductModel, { foreignKey: "cartId", as: "cart" });
  ProductModel.belongsTo(CartModel, {
    foreignKey: "cartId",
    as: "products",
  });

  return CartModel;
}
