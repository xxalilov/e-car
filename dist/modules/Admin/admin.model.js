"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModel = void 0;
const sequelize_1 = require("sequelize");
class AdminModel extends sequelize_1.Model {
}
exports.AdminModel = AdminModel;
function default_1(sequelize) {
    AdminModel.init({
        id: {
            primaryKey: true,
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
        },
        email: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING(45),
        },
        password: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING(255),
        },
    }, {
        tableName: "admin",
        sequelize,
    });
    return AdminModel;
}
exports.default = default_1;
//# sourceMappingURL=admin.model.js.map