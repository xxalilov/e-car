"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModel = void 0;
const sequelize_1 = require("sequelize");
class CartModel extends sequelize_1.Model {
}
exports.CartModel = CartModel;
function default_1(sequelize) {
    CartModel.init({
        id: {
            primaryKey: true,
            type: sequelize_1.DataTypes.BIGINT,
            autoIncrement: true
        },
        userId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        totalPrice: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
    }, {
        tableName: "carts",
        sequelize,
    });
    // const CartItem = sequelize.define("cartItem", {
    //   id: {
    //     type: DataTypes.INTEGER,
    //     primaryKey: true,
    //     allowNull: false,
    //     autoIncrement: true,
    //   },
    //   quantity: {
    //     type: DataTypes.INTEGER,
    //     defaultValue: 1,
    //   },
    //   productId: {
    //     type: DataTypes.STRING,
    //     references: {
    //       model: ProductModel,
    //       key: "id",
    //     },
    //   },
    //   cartId: {
    //     type: DataTypes.STRING,
    //     references: {
    //       model: CartModel,
    //       key: "id",
    //     },
    //   },
    // });
    // CartModel.belongsTo(ProductModel);
    // ProductModel.hasMany(CartModel, {
    //   onDelete: "CASCADE",
    //   onUpdate: "CASCADE",
    // });
    // CartModel.belongsToMany(ProductModel, {
    //   foreignKey: "cartId",
    //   as: "products",
    //   through: CartItem,
    // });
    // ProductModel.belongsToMany(CartModel, {
    //   foreignKey: "productId",
    //   as: "carts",
    //   onDelete: "CASCADE",
    //   onUpdate: "CASCADE",
    //   through: CartItem,
    // });
    CartModel.afterFind(async (cart) => {
        await cart.calculateTotal();
    });
    CartModel.prototype.addProduct = async function (product, quantity) {
        await this.addProducts(product, { through: { quantity } });
        await this.calculateTotal();
    };
    CartModel.prototype.removeProduct = async function (product) {
        await this.removeProducts(product);
        await this.calculateTotal();
    };
    CartModel.prototype.calculateTotal = async function () {
        const products = await this.getProducts();
        const totalPrice = products.reduce((sum, product) => sum + product.price * product.CartItemModel.quantity, 0);
        await this.update({ totalPrice });
    };
    return CartModel;
}
exports.default = default_1;
//# sourceMappingURL=cart.model.js.map