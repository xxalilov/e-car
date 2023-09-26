import { Model, Optional, Sequelize } from "sequelize";
import { Workshop } from "./workshop.interface";
export type WorkshopCreationAttributes = Optional<Workshop, "id" | "address" | "description" | "title" | "phone" | "workingTime" | "lat" | "long" | "typeOfWorkshopId">;
export declare class WorkshopModel extends Model<Workshop, WorkshopCreationAttributes> implements Workshop {
    id: string;
    address: string;
    description: string;
    title: string;
    phone: string;
    workingTime: string;
    lat: string;
    long: string;
    typeOfWorkshopId: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default function (sequelize: Sequelize): typeof WorkshopModel;
