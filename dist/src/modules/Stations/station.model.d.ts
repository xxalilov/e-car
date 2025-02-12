import { Model, Optional, Sequelize } from "sequelize";
import { Station } from "./station.interface";
export type StationCreationAttributes = Optional<Station, "id" | "lat" | "long" | "title_uz" | "title_ru" | "title_eng">;
export declare class StationModel extends Model<Station, StationCreationAttributes> implements Station {
    id: string;
    lat: string;
    long: string;
    title_uz: string;
    title_ru: string;
    title_eng: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default function (sequelize: Sequelize): typeof StationModel;
