import { Model, Optional, Sequelize } from "sequelize";
import { User } from "./user.interface";
export type UserCreationAttributes = Optional<User, "id" | "firstname" | "lastname" | "phone" | "photo">;
export declare class UserModel extends Model<User, UserCreationAttributes> implements User {
    id: string;
    firstname: string;
    lastname: string;
    phone: string;
    photo: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    addOffer: Function;
}
export default function (sequelize: Sequelize): typeof UserModel;
