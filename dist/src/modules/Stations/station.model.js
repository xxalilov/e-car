"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationModel = void 0;
const sequelize_1 = require("sequelize");
class StationModel extends sequelize_1.Model {
}
exports.StationModel = StationModel;
function default_1(sequelize) {
    StationModel.init({
        id: {
            primaryKey: true,
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4
        },
        lat: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        long: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
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
    }, {
        tableName: "stations",
        sequelize,
    });
    return StationModel;
}
exports.default = default_1;
//# sourceMappingURL=station.model.js.map