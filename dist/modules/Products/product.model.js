"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const tslib_1 = require("tslib");
const sequelize_1 = require("sequelize");
const slugify_1 = tslib_1.__importDefault(require("slugify"));
class ProductModel extends sequelize_1.Model {
}
exports.ProductModel = ProductModel;
function default_1(sequelize) {
    ProductModel.init({
        id: {
            primaryKey: true,
            type: sequelize_1.DataTypes.BIGINT,
            autoIncrement: true
        },
        address: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: false,
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        lat: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        long: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        photos: {
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
            allowNull: true,
        },
        typeOfProductId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        slug: {
            type: sequelize_1.DataTypes.STRING,
        },
        isTop: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        tableName: "products",
        sequelize,
    });
    ProductModel.beforeCreate((instance) => {
        const slug = (0, slugify_1.default)(instance.title.toLowerCase());
        instance.slug = slug;
    });
    ProductModel.beforeUpdate((instance) => {
        if (instance.changed("title")) {
            const slug = (0, slugify_1.default)(instance.title.toLowerCase());
            instance.slug = slug;
        }
    });
    return ProductModel;
}
exports.default = default_1;
//# sourceMappingURL=product.model.js.map