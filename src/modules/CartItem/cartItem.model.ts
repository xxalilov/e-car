import { Association, DataTypes, Model, Optional, Sequelize } from "sequelize";
import { CartItem } from "./cartItem.interface";
import { models } from "../../utils/database";
import { CartModel } from "../Cart/cart.model";
import { ProductModel } from "../Products/product.model";

export type CartItemCreationAttributes = Optional<CartItem, "id" | "quantity">;

export class CartItemModel
  extends Model<CartItem, CartItemCreationAttributes>
  implements CartItem
{
  public id: number;
  public quantity: number;
  // public cartId: string;
  // public productId: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof CartItemModel {
  CartItemModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      // productId: {
      //   type: DataTypes.STRING,
      //   references: {
      //     model: ProductModel,
      //     key: "id",
      //   },
      // },
      // cartId: {
      //   type: DataTypes.STRING,
      //   references: {
      //     model: CartModel,
      //     key: "id",
      //   },
      // },
    },
    {
      tableName: "cartitems",
      sequelize,
    }
  );

  // CartItemModel.belongsTo(CartModel);
  // CartItemModel.belongsTo(ProductModel);

  CartModel.belongsToMany(ProductModel, {
    foreignKey: "cartId",
    as: "products",
    through: CartItemModel,
  });
  ProductModel.belongsToMany(CartModel, {
    foreignKey: "productId",
    as: "carts",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    through: CartItemModel,
  });

  return CartItemModel;
}
