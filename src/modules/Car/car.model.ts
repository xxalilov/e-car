import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { Car } from "./car.interface";
import { UserModel } from "../../modules/Users/user.model";

export type CarCreationAttributes = Optional<
  Car,
  "id" | "model" | "name" | "carNumber" | "licenseNumber" | "photo" | "userId"
>;

export class CarModel extends Model<Car, CarCreationAttributes> implements Car {
  public id: string;
  public model: string;
  public name: string;
  public carNumber: string;
  public licenseNumber: string;
  public userId: string;
  public photo: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof CarModel {
  CarModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      carNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      licenseNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      photo: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "cars",
      sequelize,
    }
  );

  UserModel.hasMany(CarModel, { foreignKey: "userId", as: "cars" });
  CarModel.belongsTo(UserModel, {
    foreignKey: "userId",
    as: "user",
  });

  return CarModel;
}
