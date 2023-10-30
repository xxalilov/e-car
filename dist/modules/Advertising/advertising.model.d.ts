import { Model, Optional, Sequelize } from "sequelize";
import { Advertising } from "./advertising.interface";
export type AdvertisingCreationAttributes = Optional<Advertising, "id" | "photo" | "link">;
export declare class AdvertisingModel extends Model<Advertising, AdvertisingCreationAttributes> implements Advertising {
    id: string;
    photo: string;
    link: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default function (sequelize: Sequelize): typeof AdvertisingModel;
