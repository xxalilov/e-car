import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { User } from "./user.interface";
import { models } from "../../utils/database";

export type UserCreationAttributes = Optional<
  User,
  "id" | "firstname" | "lastname" | "phone" | "photo" | "card"
>;

export class UserModel
  extends Model<User, UserCreationAttributes>
  implements User
{
  public id: number;
  public firstname: string;
  public lastname: string;
  public phone: string;
  public photo: string;
  public card: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof UserModel {
  UserModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true
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
      card: {
        type: DataTypes.STRING(500),
      },
    },
    {
      tableName: "users",
      sequelize,
    }
  );

  UserModel.afterCreate(async (user: UserModel, options) => {
    await models.Cart.create({ userId: user.id });
  });

  return UserModel;
}
