import { Model, Optional, Sequelize } from "sequelize";
import { Workshop } from "./workshop.interface";
export type WorkshopCreationAttributes = Optional<Workshop, "id" | "address_uz" | "address_ru" | "address_eng" | "description_uz" | "description_ru" | "description_eng" | "title_uz" | "title_ru" | "title_eng" | "phone" | "workingTime" | "lat" | "long" | "typeOfWorkshopId">;
export declare class WorkshopModel extends Model<Workshop, WorkshopCreationAttributes> implements Workshop {
    id: string;
    address_uz: string;
    address_ru: string;
    address_eng: string;
    description_uz: string;
    description_ru: string;
    description_eng: string;
    title_uz: string;
    title_ru: string;
    title_eng: string;
    phone: string;
    workingTime: string;
    lat: string;
    long: string;
    typeOfWorkshopId: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default function (sequelize: Sequelize): typeof WorkshopModel;
