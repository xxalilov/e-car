import {DataTypes, Model, Optional, Sequelize} from "sequelize";
import {Shipping} from "./shipping.interface";

export type ShippingCreationAttributes = Optional<
    Shipping,
    "id" | "type" | "price"
>;

export class ShippingModel extends Model<Shipping, ShippingCreationAttributes> implements Shipping {
    public id: string;
    public type: string;
    public price: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof ShippingModel {
    ShippingModel.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false
            },
            type: {
                type: DataTypes.ENUM({values: ["bts", "express", "normal"]}),
                allowNull: false,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
        },
        {
            tableName: "shipping",
            sequelize,
        }
    );

    return ShippingModel;
}
