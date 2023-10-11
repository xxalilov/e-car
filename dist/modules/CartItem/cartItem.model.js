"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemModel = void 0;
const sequelize_1 = require("sequelize");
const cart_model_1 = require("../Cart/cart.model");
const product_model_1 = require("../Products/product.model");
class CartItemModel extends sequelize_1.Model {
}
exports.CartItemModel = CartItemModel;
function default_1(sequelize) {
    CartItemModel.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        quantity: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: 1,
        },
        // productId: {
        //   type: DataTypes.STRING,
        //   references: {
        //     model: ProductModel,
        //     key: "id",
        //   },
        // },
        // cartId: {
        //   type: DataTypes.STRING,
        //   references: {
        //     model: CartModel,
        //     key: "id",
        //   },
        // },
    }, {
        tableName: "cartitems",
        sequelize,
    });
    // CartItemModel.belongsTo(CartModel);
    // CartItemModel.belongsTo(ProductModel);
    cart_model_1.CartModel.belongsToMany(product_model_1.ProductModel, {
        foreignKey: "cartId",
        as: "products",
        through: CartItemModel,
    });
    product_model_1.ProductModel.belongsToMany(cart_model_1.CartModel, {
        foreignKey: "productId",
        as: "carts",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        through: CartItemModel,
    });
    return CartItemModel;
}
exports.default = default_1;
//# sourceMappingURL=cartItem.model.js.map