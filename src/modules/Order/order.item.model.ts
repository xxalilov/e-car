import {DataTypes, Model, Optional, Sequelize} from "sequelize";
import {ProductModel} from "../Products/product.model";
import {OrderItem} from "./order.item.interface";
import {OrderModel} from "./order.model";

export type OrderItemCreationAttributes = Optional<OrderItem, "id" | "quantity">;

export class OrderItemModel
    extends Model<OrderItem, OrderItemCreationAttributes>
    implements OrderItem {
    public id: number;
    public quantity: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof OrderItemModel {
    OrderItemModel.init(
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            quantity: {
                type: DataTypes.INTEGER,
                defaultValue: 1,
            },
        },
        {
            tableName: "orderitems",
            sequelize,
        }
    );

    OrderModel.belongsToMany(ProductModel, {
        foreignKey: "orderId",
        as: "products",
        through: OrderItemModel,
    });
    ProductModel.belongsToMany(OrderModel, {
        foreignKey: "productId",
        as: "orders",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        through: OrderItemModel,
    });

    return OrderItemModel;
}
