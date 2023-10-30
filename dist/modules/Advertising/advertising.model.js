"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvertisingModel = void 0;
const sequelize_1 = require("sequelize");
class AdvertisingModel extends sequelize_1.Model {
}
exports.AdvertisingModel = AdvertisingModel;
function default_1(sequelize) {
    AdvertisingModel.init({
        id: {
            primaryKey: true,
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
        },
        link: {
            type: sequelize_1.DataTypes.STRING,
        },
        photo: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: "advertisings",
        sequelize,
    });
    return AdvertisingModel;
}
exports.default = default_1;
//# sourceMappingURL=advertising.model.js.map