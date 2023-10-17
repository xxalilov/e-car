import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { TypeOfProduct } from "./typeOfProduct.interface";

export type TypeOfProductCreationAttributes = Optional<
  TypeOfProduct,
  "id" | "photo" | "uz" | "eng" | "ru"
>;

export class TypeOfProductModel
  extends Model<TypeOfProduct, TypeOfProductCreationAttributes>
  implements TypeOfProduct
{
  public id: string;
  public uz: string;
  public eng: string;
  public ru: string;

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
      photo: {
        type: DataTypes.STRING,
      },
      uz: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      eng: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      ru: {
          type: DataTypes.STRING,
          allowNull: false,
        }
    },
    {
      sequelize,
      tableName: "typesofproducts"
    }
  );
  return TypeOfProductModel;
}
