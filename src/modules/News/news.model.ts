import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { News } from "./news.interface";

export type NewsCreationAttributes = Optional<
    News,
    "id" | "title" | "description" | "image" | "link"
>;

export class NewsModel extends Model<News, NewsCreationAttributes> implements News {
    public id: number;
    public title: string;
    public description: string;
    public image: string;
    public link: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof NewsModel {
    NewsModel.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.BIGINT,
                autoIncrement: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
            },
            link: {
                type: DataTypes.STRING,
            },
            image: {
                type: DataTypes.STRING,
            }
        },
        {
            tableName: "news",
            sequelize,
        }
    );

    return NewsModel;
}
