import { Model, Optional, Sequelize } from "sequelize";
import { Shipping } from "./shipping.interface";
export type ShippingCreationAttributes = Optional<Shipping, "id" | "type" | "price">;
export declare class ShippingModel extends Model<Shipping, ShippingCreationAttributes> implements Shipping {
    id: string;
    type: string;
    price: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default function (sequelize: Sequelize): typeof ShippingModel;
