import { Model, Optional, Sequelize } from "sequelize";
import { Product } from "./product.interface";
export type ProductCreationAttributes = Optional<Product, "id" | "address_uz" | "address_ru" | "address_eng" | "description_uz" | "description_ru" | "description_eng" | "photos" | "lat" | "long" | "phone" | "price" | "title_uz" | "title_ru" | "title_eng" | "typeOfProductId" | "slug" | "isTop">;
export declare class ProductModel extends Model<Product, ProductCreationAttributes> implements Product {
    id: string;
    address_uz: string;
    address_ru: string;
    address_eng: string;
    description_uz: string;
    description_ru: string;
    description_eng: string;
    phone: string;
    price: number;
    title_uz: string;
    title_ru: string;
    title_eng: string;
    typeOfProductId: string;
    lat: string;
    long: string;
    slug: string;
    photos: string[];
    isTop: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default function (sequelize: Sequelize): typeof ProductModel;
