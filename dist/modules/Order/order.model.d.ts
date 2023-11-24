import { Model, Optional, Sequelize } from "sequelize";
import { Order } from "./order.interface";
export type OrderCreationAttributes = Optional<Order, "id" | "userId" | "shipping_type" | "shipping_address" | "shipping_price" | "shipping_status" | "payment_type" | "is_paid" | "total_price" | "status">;
export declare class OrderModel extends Model<Order, OrderCreationAttributes> implements Order {
    id: number;
    userId: string;
    shipping_type: string;
    shipping_price: number;
    shipping_address: string;
    shipping_status: boolean;
    payment_type: string;
    is_paid: boolean;
    total_price: number;
    status: string;
    addProduct: Function;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default function (sequelize: Sequelize): typeof OrderModel;
