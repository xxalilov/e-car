import { Model, Optional, Sequelize } from "sequelize";
import { TypeOfProduct } from "./typeOfProduct.interface";
export type TypeOfProductCreationAttributes = Optional<TypeOfProduct, "id" | "title" | "photo">;
export declare class TypeOfProductModel extends Model<TypeOfProduct, TypeOfProductCreationAttributes> implements TypeOfProduct {
    id: string;
    title: string;
    photo: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default function (sequelize: Sequelize): typeof TypeOfProductModel;
