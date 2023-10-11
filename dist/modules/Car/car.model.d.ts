import { Model, Optional, Sequelize } from "sequelize";
import { Car } from "./car.interface";
export type CarCreationAttributes = Optional<Car, "id" | "model" | "name" | "carNumber" | "licenseNumber" | "photo" | "userId">;
export declare class CarModel extends Model<Car, CarCreationAttributes> implements Car {
    id: string;
    model: string;
    name: string;
    carNumber: string;
    licenseNumber: string;
    userId: string;
    photo: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default function (sequelize: Sequelize): typeof CarModel;
