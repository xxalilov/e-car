import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { Workshop } from "./workshop.interface";
import { TypeOfWorkshopModel } from "modules/TypesOfWorkshops/typeOfWorkshop.model";

export type WorkshopCreationAttributes = Optional<
  Workshop,
  | "id"
  | "address"
  | "description"
  | "title"
  | "phone"
  | "workingTime"
  | "lat"
  | "long"
  | "type"
>;

export class WorkshopModel
  extends Model<Workshop, WorkshopCreationAttributes>
  implements Workshop
{
  public id: string;
  public address: string;
  public description: string;
  public title: string;
  public phone: string;
  public workingTime: string;
  public lat: string;
  public long: string;
  public type: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof WorkshopModel {
  WorkshopModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      workingTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      long: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "workshops",
      sequelize,
    }
  );

  TypeOfWorkshopModel.hasMany(WorkshopModel, {
    foreignKey: "typeId",
    as: "workshops",
  });
  WorkshopModel.belongsTo(TypeOfWorkshopModel, {
    foreignKey: "typeId",
    as: "type",
  });

  return WorkshopModel;
}
