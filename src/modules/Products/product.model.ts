import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import slugify from "slugify";
import { Product } from "./product.interface";

export type ProductCreationAttributes = Optional<
  Product,
  | "id"
  | "address"
  | "description"
  | "photos"
  | "lat"
  | "long"
  | "phone"
  | "price"
  | "title"
  | "typeOfProductId"
  | "slug"
    | "isTop"
>;

export class ProductModel
  extends Model<Product, ProductCreationAttributes>
  implements Product
{
  public id: string;
  public address: string;
  public description: string;
  public phone: string;
  public price: number;
  public title: string;
  public typeOfProductId: string;
  public lat: string;
  public long: string;
  public slug: string;
  public photos: string[];
  public isTop: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof ProductModel {
  ProductModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      title: {
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
      photos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      typeOfProductId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
      },
        isTop: {
          type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
      tableName: "products",
      sequelize,
    }
  );

  ProductModel.beforeCreate((instance: ProductModel) => {
    const slug = slugify(instance.title.toLowerCase());
    instance.slug = slug;
  });

  ProductModel.beforeUpdate((instance: ProductModel) => {
    if (instance.changed("title")) {
      const slug = slugify(instance.title.toLowerCase());
      instance.slug = slug;
    }
  });

  return ProductModel;
}
