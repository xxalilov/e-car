"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarModel = void 0;
const sequelize_1 = require("sequelize");
const user_model_1 = require("../../modules/Users/user.model");
class CarModel extends sequelize_1.Model {
}
exports.CarModel = CarModel;
function default_1(sequelize) {
    CarModel.init({
        id: {
            primaryKey: true,
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4
        },
        model: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        carNumber: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        licenseNumber: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        photo: {
            type: sequelize_1.DataTypes.STRING,
        },
    }, {
        tableName: "cars",
        sequelize,
    });
    user_model_1.UserModel.hasMany(CarModel, { foreignKey: "userId", as: "cars" });
    CarModel.belongsTo(user_model_1.UserModel, {
        foreignKey: "userId",
        as: "user",
    });
    return CarModel;
}
exports.default = default_1;
//# sourceMappingURL=car.model.js.map