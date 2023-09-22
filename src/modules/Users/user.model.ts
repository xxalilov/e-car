import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { User } from "./user.interface";

export type UserCreationAttributes = Optional<
  User,
  "id" | "firstname" | "lastname" | "phone" | "photo"
>;

export class UserModel
  extends Model<User, UserCreationAttributes>
  implements User
{
  public id: string;
  public firstname: string;
  public lastname: string;
  public phone: string;
  public photo: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof UserModel {
  UserModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      firstname: {
        type: DataTypes.STRING,
      },
      lastname: {
        type: DataTypes.STRING,
      },
      phone: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "users",
      sequelize,
    }
  );

  return UserModel;
}
