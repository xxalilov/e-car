import {DataTypes, Model, Optional, Sequelize} from "sequelize";
import {Order} from "./order.interface";
import {Product} from "../Products/product.interface";

export type OrderCreationAttributes = Optional<
    Order,
    "id" | "userId" | "shipping_type" | "shipping_address" | "shipping_price" | "shipping_status" | "payment_type" | "is_paid" | "total_price" | "status"
>;

export class OrderModel extends Model<Order, OrderCreationAttributes> implements Order {
    public id: number;
    public userId: string;
    public shipping_type: string;
    public shipping_price: number;
    public shipping_address: string;
    public shipping_status: boolean;
    public payment_type: string;
    public is_paid: boolean;
    public total_price: number;
    public status: string;

    public addProduct!: Function;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof OrderModel {
    OrderModel.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.BIGINT,
                autoIncrement: true
            },
            userId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            shipping_type: {
                type: DataTypes.ENUM({
                    values: ["bts", "express", "normal"]
                })
            },
            shipping_address: {
                type: DataTypes.STRING
            },
            shipping_price: {
                type: DataTypes.FLOAT
            },
            shipping_status: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            payment_type: {
                type: DataTypes.ENUM({
                    values: ["card", "cash"]
                })
            },
            is_paid: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            total_price: {
                type: DataTypes.FLOAT
            },
            status: {
                type: DataTypes.ENUM({
                    values: ["in_progress", "delivered" ,"done", "canceled"]
                }),
                defaultValue: "in_progress"
            }
        },
        {
            tableName: "orders",
            sequelize,
        }
    );

    OrderModel.prototype.addProduct = async function (
        product: Product,
        quantity: number
    ): Promise<void> {
        await this.addProducts(product, {through: {quantity}});
    };

    return OrderModel;
}
