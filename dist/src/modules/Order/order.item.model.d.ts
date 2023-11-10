import { Model, Optional, Sequelize } from "sequelize";
import { OrderItem } from "./order.item.interface";
export type OrderItemCreationAttributes = Optional<OrderItem, "id" | "quantity">;
export declare class OrderItemModel extends Model<OrderItem, OrderItemCreationAttributes> implements OrderItem {
    id: number;
    quantity: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default function (sequelize: Sequelize): typeof OrderItemModel;
