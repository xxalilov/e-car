import { Model, Optional, Sequelize } from "sequelize";
import { News } from "./news.interface";
export type NewsCreationAttributes = Optional<News, "id" | "title" | "description" | "image" | "link">;
export declare class NewsModel extends Model<News, NewsCreationAttributes> implements News {
    id: number;
    title: string;
    description: string;
    image: string;
    link: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default function (sequelize: Sequelize): typeof NewsModel;
