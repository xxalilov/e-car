import { Model, Optional, Sequelize } from "sequelize";
import { Cart } from "./cart.interface";
export type CartCreationAttributes = Optional<Cart, "id" | "userId" | "products">;
export declare class CartModel extends Model<Cart, CartCreationAttributes> implements Cart {
    id: number;
    products: {
        productId: string;
        quantity: number;
    }[];
    userId: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default function (sequelize: Sequelize): typeof CartModel;
