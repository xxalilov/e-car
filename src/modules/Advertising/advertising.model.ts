import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { Advertising } from "./advertising.interface";

export type AdvertisingCreationAttributes = Optional<
  Advertising,
  "id" | "photo" | "link"
>;

export class AdvertisingModel
  extends Model<Advertising, AdvertisingCreationAttributes>
  implements Advertising
{
  public id: string;
  public photo: string;
  public link: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof AdvertisingModel {
  AdvertisingModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      link: {
        type: DataTypes.STRING,
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "advertisings",
      sequelize,
    }
  );

  return AdvertisingModel;
}
