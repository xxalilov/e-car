"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOfWorkshopModel = void 0;
const sequelize_1 = require("sequelize");
class TypeOfWorkshopModel extends sequelize_1.Model {
}
exports.TypeOfWorkshopModel = TypeOfWorkshopModel;
function default_1(sequelize) {
    TypeOfWorkshopModel.init({
        id: {
            primaryKey: true,
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
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
        photo: {
            type: sequelize_1.DataTypes.STRING,
        },
    }, {
        tableName: "typesofworkshops",
        sequelize,
    });
    return TypeOfWorkshopModel;
}
exports.default = default_1;
//# sourceMappingURL=typeOfWorkshop.model.js.map