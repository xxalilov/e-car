import { Model, Optional, Sequelize } from "sequelize";
import { Cart } from "./cart.interface";
export type CartCreationAttributes = Optional<Cart, "id" | "userId" | "totalPrice">;
export declare class CartModel extends Model<Cart, CartCreationAttributes> implements Cart {
    id: number;
    userId: string;
    totalPrice: number;
    addProduct: Function;
    removeProduct: Function;
    calculateTotal: Function;
    getProducts: Function;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default function (sequelize: Sequelize): typeof CartModel;
