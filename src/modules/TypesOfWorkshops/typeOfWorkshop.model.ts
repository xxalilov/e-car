import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { TypeOfWorkshop } from "./typeOfWorkshop.interface";

export type TypeOfWorkshopCreationAttributes = Optional<
  TypeOfWorkshop,
  "id" | "title" | "photo"
>;

export class TypeOfWorkshopModel
  extends Model<TypeOfWorkshop, TypeOfWorkshopCreationAttributes>
  implements TypeOfWorkshop
{
  public id: string;
  public title: string;

  public photo: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof TypeOfWorkshopModel {
  TypeOfWorkshopModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      photo: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "typesofworkshops",
      sequelize,
    }
  );

  return TypeOfWorkshopModel;
}
