"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingModel = void 0;
const sequelize_1 = require("sequelize");
class ShippingModel extends sequelize_1.Model {
}
exports.ShippingModel = ShippingModel;
function default_1(sequelize) {
    ShippingModel.init({
        id: {
            primaryKey: true,
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            allowNull: false
        },
        type: {
            type: sequelize_1.DataTypes.ENUM({ values: ["bts", "express", "normal"] }),
            allowNull: false,
        },
        price: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: false,
        },
    }, {
        tableName: "shipping",
        sequelize,
    });
    return ShippingModel;
}
exports.default = default_1;
//# sourceMappingURL=shipping.model.js.map