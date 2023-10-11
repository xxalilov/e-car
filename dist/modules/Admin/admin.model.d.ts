import { Model, Optional, Sequelize } from "sequelize";
import { Admin } from "./admin.interface";
export type UserCreationAttributes = Optional<Admin, "id" | "email" | "password" | "fullname" | "role">;
export declare class AdminModel extends Model<Admin, UserCreationAttributes> implements Admin {
    id: string;
    email: string;
    password: string;
    fullname: string;
    role: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default function (sequelize: Sequelize): typeof AdminModel;
