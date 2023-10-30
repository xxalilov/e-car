"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsModel = void 0;
const sequelize_1 = require("sequelize");
class NewsModel extends sequelize_1.Model {
}
exports.NewsModel = NewsModel;
function default_1(sequelize) {
    NewsModel.init({
        id: {
            primaryKey: true,
            type: sequelize_1.DataTypes.BIGINT,
            autoIncrement: true
        },
        title_uz: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        title_ru: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        title_eng: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        description_uz: {
            type: sequelize_1.DataTypes.STRING,
        },
        description_ru: {
            type: sequelize_1.DataTypes.STRING,
        },
        description_eng: {
            type: sequelize_1.DataTypes.STRING,
        },
        link: {
            type: sequelize_1.DataTypes.STRING,
        },
        image: {
            type: sequelize_1.DataTypes.STRING,
        }
    }, {
        tableName: "news",
        sequelize,
    });
    return NewsModel;
}
exports.default = default_1;
//# sourceMappingURL=news.model.js.map