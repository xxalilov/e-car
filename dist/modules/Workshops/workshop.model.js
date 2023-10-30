"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkshopModel = void 0;
const sequelize_1 = require("sequelize");
class WorkshopModel extends sequelize_1.Model {
}
exports.WorkshopModel = WorkshopModel;
function default_1(sequelize) {
    WorkshopModel.init({
        id: {
            primaryKey: true,
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
        },
        address_uz: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        }, address_ru: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        }, address_eng: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        description_uz: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        }, description_ru: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        }, description_eng: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        title_uz: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        }, title_ru: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        }, title_eng: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        workingTime: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        lat: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        long: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        typeOfWorkshopId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: "workshops",
        sequelize,
    });
    // TypeOfWorkshopModel.hasMany(WorkshopModel, {
    //   foreignKey: "typeOfWorkshopId",
    //   as: "workshops",
    // });
    // WorkshopModel.belongsTo(TypeOfWorkshopModel, {
    //   foreignKey: "typeOfWorkshopId",
    //   as: "type",
    // });
    return WorkshopModel;
}
exports.default = default_1;
//# sourceMappingURL=workshop.model.js.map