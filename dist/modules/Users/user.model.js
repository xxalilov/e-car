"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const sequelize_1 = require("sequelize");
class UserModel extends sequelize_1.Model {
}
exports.UserModel = UserModel;
function default_1(sequelize) {
    UserModel.init({
        id: {
            primaryKey: true,
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
        },
        firstname: {
            type: sequelize_1.DataTypes.STRING,
        },
        lastname: {
            type: sequelize_1.DataTypes.STRING,
        },
        phone: {
            primaryKey: true,
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        photo: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
    }, {
        tableName: "users",
        sequelize,
    });
    return UserModel;
}
exports.default = default_1;
//# sourceMappingURL=user.model.js.map