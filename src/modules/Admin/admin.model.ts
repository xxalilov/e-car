import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { Admin } from "./admin.interface";

export type UserCreationAttributes = Optional<
  Admin,
  "id" | "email" | "password" | "fullname" | "role"
>;

export class AdminModel
  extends Model<Admin, UserCreationAttributes>
  implements Admin
{
  public id: string;
  public email: string;
  public password: string;
  public fullname: string;
  public role: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof AdminModel {
  AdminModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      fullname: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.ENUM({
          values: ["admin", "superadmin"],
        }),
        defaultValue: "admin",
      },
    },
    {
      tableName: "admin",
      sequelize,
    }
  );

  return AdminModel;
}
