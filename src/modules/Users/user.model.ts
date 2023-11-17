import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { User } from "./user.interface";
import { models } from "../../utils/database";
import {OfferModel} from "../Offer/offer.model";
import {OrderModel} from "../Order/order.model";

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

  public addOffer!: Function;
}

export default function (sequelize: Sequelize): typeof UserModel {
  UserModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
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

  UserModel.afterCreate(async (user: UserModel, options) => {
    await models.Cart.create({ userId: user.id });
  });

  UserModel.hasMany(OfferModel, {
    foreignKey: "userId",
    as: "offers",
  });
  OfferModel.belongsTo(UserModel, {
    foreignKey: "userId",
    as: "user",
  });

  // UserModel.hasMany(OrderModel, {
  //   foreignKey: "userId",
  //   as: "orders",
  // });
  // OrderModel.belongsTo(UserModel, {
  //   foreignKey: "userId",
  //   as: "user",
  // });

  return UserModel;
}
