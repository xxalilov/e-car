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
            type: sequelize_1.DataTypes.BIGINT,
            autoIncrement: true
        },
        lat: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        long: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        title: {
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