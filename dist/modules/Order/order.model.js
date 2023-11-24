"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const sequelize_1 = require("sequelize");
class OrderModel extends sequelize_1.Model {
}
exports.OrderModel = OrderModel;
function default_1(sequelize) {
    OrderModel.init({
        id: {
            primaryKey: true,
            type: sequelize_1.DataTypes.BIGINT,
            autoIncrement: true
        },
        userId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        shipping_type: {
            type: sequelize_1.DataTypes.ENUM({
                values: ["bts", "express", "normal"]
            })
        },
        shipping_address: {
            type: sequelize_1.DataTypes.STRING
        },
        shipping_price: {
            type: sequelize_1.DataTypes.FLOAT
        },
        shipping_status: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false
        },
        payment_type: {
            type: sequelize_1.DataTypes.ENUM({
                values: ["card", "cash"]
            })
        },
        is_paid: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false
        },
        total_price: {
            type: sequelize_1.DataTypes.FLOAT
        },
        status: {
            type: sequelize_1.DataTypes.ENUM({
                values: ["in_progress", "delivered", "done", "canceled"]
            }),
            defaultValue: "in_progress"
        }
    }, {
        tableName: "orders",
        sequelize,
    });
    OrderModel.prototype.addProduct = async function (product, quantity) {
        await this.addProducts(product, { through: { quantity } });
    };
    return OrderModel;
}
exports.default = default_1;
//# sourceMappingURL=order.model.js.map