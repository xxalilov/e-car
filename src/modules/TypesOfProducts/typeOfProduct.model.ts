import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { TypeOfProduct } from "./typeOfProduct.interface";

export type TypeOfProductCreationAttributes = Optional<
  TypeOfProduct,
  "id" | "title" | "photo"
>;

export class TypeOfProductModel
  extends Model<TypeOfProduct, TypeOfProductCreationAttributes>
  implements TypeOfProduct
{
  public id: string;
  public title: string;

  public photo: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof TypeOfProductModel {
  TypeOfProductModel.init(
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
      tableName: "typesofproducts",
      sequelize,
    }
  );

  return TypeOfProductModel;
}
