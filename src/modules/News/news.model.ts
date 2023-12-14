import {DataTypes, Model, Optional, Sequelize} from "sequelize";
import {News} from "./news.interface";

export type NewsCreationAttributes = Optional<
    News,
    "id" | "title_uz" | "title_ru" | "title_eng" | "description_uz" | "description_ru" | "description_eng" | "image" | "link"
>;

export class NewsModel extends Model<News, NewsCreationAttributes> implements News {
    public id: number;
    public title_uz: string;
    public title_ru: string;
    public title_eng: string;
    public description_uz: string;
    public description_ru: string;
    public description_eng: string;
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
            description_uz: {
                type: DataTypes.STRING(1000),
            },
            description_ru: {
                type: DataTypes.STRING(1000),
            },
            description_eng: {
                type: DataTypes.STRING(1000),
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
