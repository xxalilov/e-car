import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { Admin } from "./admin.interface";

export type UserCreationAttributes = Optional<
  Admin,
  "id" | "email" | "password"
>;

export class AdminModel
  extends Model<Admin, UserCreationAttributes>
  implements Admin
{
  public id: string;
  public email: string;
  public password: string;

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
    },
    {
      tableName: "admin",
      sequelize,
    }
  );

  return AdminModel;
}
