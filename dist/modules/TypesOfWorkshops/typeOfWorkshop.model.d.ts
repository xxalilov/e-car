import { Model, Optional, Sequelize } from "sequelize";
import { TypeOfWorkshop } from "./typeOfWorkshop.interface";
export type TypeOfWorkshopCreationAttributes = Optional<TypeOfWorkshop, "id" | "title" | "photo">;
export declare class TypeOfWorkshopModel extends Model<TypeOfWorkshop, TypeOfWorkshopCreationAttributes> implements TypeOfWorkshop {
    id: string;
    title: string;
    photo: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default function (sequelize: Sequelize): typeof TypeOfWorkshopModel;
