import { Model, Optional, Sequelize } from "sequelize";
import { News } from "./news.interface";
export type NewsCreationAttributes = Optional<News, "id" | "title_uz" | "title_ru" | "title_eng" | "description_uz" | "description_ru" | "description_eng" | "image" | "link">;
export declare class NewsModel extends Model<News, NewsCreationAttributes> implements News {
    id: number;
    title_uz: string;
    title_ru: string;
    title_eng: string;
    description_uz: string;
    description_ru: string;
    description_eng: string;
    image: string;
    link: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default function (sequelize: Sequelize): typeof NewsModel;
