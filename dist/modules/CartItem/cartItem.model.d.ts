import { Model, Optional, Sequelize } from "sequelize";
import { CartItem } from "./cartItem.interface";
export type CartItemCreationAttributes = Optional<CartItem, "id" | "quantity">;
export declare class CartItemModel extends Model<CartItem, CartItemCreationAttributes> implements CartItem {
    id: number;
    quantity: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default function (sequelize: Sequelize): typeof CartItemModel;
