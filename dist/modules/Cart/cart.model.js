"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModel = void 0;
const sequelize_1 = require("sequelize");
const product_model_1 = require("../../modules/Products/product.model");
class CartModel extends sequelize_1.Model {
}
exports.CartModel = CartModel;
function default_1(sequelize) {
    CartModel.init({
        id: {
            primaryKey: true,
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
        },
        products: {
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.JSON()),
        },
        userId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: "carts",
        sequelize,
    });
    CartModel.hasMany(product_model_1.ProductModel, { foreignKey: "cartId", as: "cart" });
    product_model_1.ProductModel.belongsTo(CartModel, {
        foreignKey: "cartId",
        as: "products",
    });
    return CartModel;
}
exports.default = default_1;
//# sourceMappingURL=cart.model.js.map