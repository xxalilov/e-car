import { Model, Optional, Sequelize } from "sequelize";
import { Station } from "./station.interface";
export type StationCreationAttributes = Optional<Station, "id" | "lat" | "long" | "title">;
export declare class StationModel extends Model<Station, StationCreationAttributes> implements Station {
    id: number;
    lat: string;
    long: string;
    title: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default function (sequelize: Sequelize): typeof StationModel;
