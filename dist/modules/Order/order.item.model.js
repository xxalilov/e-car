"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemModel = void 0;
const sequelize_1 = require("sequelize");
const product_model_1 = require("../Products/product.model");
const order_model_1 = require("./order.model");
class OrderItemModel extends sequelize_1.Model {
}
exports.OrderItemModel = OrderItemModel;
function default_1(sequelize) {
    OrderItemModel.init({
        id: {
            type: sequelize_1.DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        quantity: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: 1,
        },
    }, {
        tableName: "orderitems",
        sequelize,
    });
    order_model_1.OrderModel.belongsToMany(product_model_1.ProductModel, {
        foreignKey: "orderId",
        as: "products",
        through: OrderItemModel,
    });
    product_model_1.ProductModel.belongsToMany(order_model_1.OrderModel, {
        foreignKey: "productId",
        as: "orders",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        through: OrderItemModel,
    });
    return OrderItemModel;
}
exports.default = default_1;
//# sourceMappingURL=order.item.model.js.map