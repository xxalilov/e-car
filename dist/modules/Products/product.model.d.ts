import { Model, Optional, Sequelize } from "sequelize";
import { Product } from "./product.interface";
export type ProductCreationAttributes = Optional<Product, "id" | "address" | "description" | "photos" | "lat" | "long" | "phone" | "price" | "title" | "typeOfProductId" | "slug" | "isTop">;
export declare class ProductModel extends Model<Product, ProductCreationAttributes> implements Product {
    id: string;
    address: string;
    description: string;
    phone: string;
    price: number;
    title: string;
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
