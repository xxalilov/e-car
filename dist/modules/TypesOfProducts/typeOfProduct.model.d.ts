import { Model, Optional, Sequelize } from "sequelize";
import { TypeOfProduct } from "./typeOfProduct.interface";
export type TypeOfProductCreationAttributes = Optional<TypeOfProduct, "id" | "photo" | "uz" | "eng" | "ru">;
export declare class TypeOfProductModel extends Model<TypeOfProduct, TypeOfProductCreationAttributes> implements TypeOfProduct {
    id: string;
    uz: string;
    eng: string;
    ru: string;
    photo: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default function (sequelize: Sequelize): typeof TypeOfProductModel;
