import {DataTypes, Model, Optional, Sequelize} from "sequelize";
import {Order} from "./order.interface";
import {Product} from "../Products/product.interface";
import {CartModel} from "../Cart/cart.model";

export type OrderCreationAttributes = Optional<
    Order,
    "id" | "userId" | "shipping_address" | "shipping_price" | "payment_type" | "is_paid" | "total_price"
>;

export class OrderModel extends Model<Order, OrderCreationAttributes> implements Order {
    public id: number;
    public userId: string;
    public shipping_price: number;
    public shipping_address: string;
    public payment_type: string;
    public is_paid: boolean;
    public total_price: number;

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
            shipping_address: {
                type: DataTypes.STRING
            },
            shipping_price: {
                type: DataTypes.FLOAT
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
