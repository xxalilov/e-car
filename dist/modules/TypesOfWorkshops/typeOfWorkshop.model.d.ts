import { Model, Optional, Sequelize } from "sequelize";
import { TypeOfWorkshop } from "./typeOfWorkshop.interface";
export type TypeOfWorkshopCreationAttributes = Optional<TypeOfWorkshop, "id" | "title_uz" | "title_ru" | "title_eng" | "photo">;
export declare class TypeOfWorkshopModel extends Model<TypeOfWorkshop, TypeOfWorkshopCreationAttributes> implements TypeOfWorkshop {
    id: string;
    title_uz: string;
    title_ru: string;
    title_eng: string;
    photo: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default function (sequelize: Sequelize): typeof TypeOfWorkshopModel;
