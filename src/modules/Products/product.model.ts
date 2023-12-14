import {DataTypes, Model, Optional, Sequelize} from "sequelize";
import slugify from "slugify";
import {Product} from "./product.interface";

export type ProductCreationAttributes = Optional<
    Product,
    | "id"
    | "address_uz"
    | "address_ru"
    | "address_eng"
    | "description_uz"
    | "description_ru"
    | "description_eng"
    | "photos"
    | "lat"
    | "long"
    | "phone"
    | "price"
    | "title_uz"
    | "title_ru"
    | "title_eng"
    | "typeOfProductId"
    | "slug"
    | "isTop"
>;

export class ProductModel
    extends Model<Product, ProductCreationAttributes>
    implements Product {
    public id: string;
    public address_uz: string;
    public address_ru: string;
    public address_eng: string;
    public description_uz: string;
    public description_ru: string;
    public description_eng: string;
    public phone: string;
    public price: number;
    public title_uz: string;
    public title_ru: string;
    public title_eng: string;
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
            address_uz: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address_ru: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address_eng: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description_uz: {
                type: DataTypes.STRING(1000),
                allowNull: false,
            },
            description_ru: {
                type: DataTypes.STRING(1000),
                allowNull: false,
            },
            description_eng: {
                type: DataTypes.STRING(1000),
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
            title_uz: {
                type: DataTypes.STRING(400),
                allowNull: false,
            },
            title_ru: {
                type: DataTypes.STRING(400),
                allowNull: false,
            },
            title_eng: {
                type: DataTypes.STRING(400),
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
        const slug = `${slugify(instance.title_uz.toLowerCase())}-${slugify(instance.title_ru.toLowerCase())}-${slugify(instance.title_eng.toLowerCase())}`;
        instance.slug = slug;
    });

    ProductModel.beforeUpdate((instance: ProductModel) => {
        if (instance.changed("title_uz" || "title_ru" || "title_eng")) {
            const slug = `${slugify(instance.title_uz.toLowerCase())}-${slugify(instance.title_ru.toLowerCase())}-${slugify(instance.title_eng.toLowerCase())}`;
            instance.slug = slug;
        }
    });

    return ProductModel;
}
