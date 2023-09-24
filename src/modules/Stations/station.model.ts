import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { Station } from "./station.interface";

export type StationCreationAttributes = Optional<
  Station,
  "id" | "lat" | "long" | "title"
>;

export class StationModel
  extends Model<Station, StationCreationAttributes>
  implements Station
{
  public id: string;
  public lat: string;
  public long: string;
  public title: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof StationModel {
  StationModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      lat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      long: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "stations",
      sequelize,
    }
  );

  return StationModel;
}
