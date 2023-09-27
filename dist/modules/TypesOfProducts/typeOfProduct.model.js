"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOfProductModel = void 0;
const sequelize_1 = require("sequelize");
class TypeOfProductModel extends sequelize_1.Model {
}
exports.TypeOfProductModel = TypeOfProductModel;
function default_1(sequelize) {
    TypeOfProductModel.init({
        id: {
            primaryKey: true,
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        photo: {
            type: sequelize_1.DataTypes.STRING,
        },
    }, {
        tableName: "typesofproducts",
        sequelize,
    });
    return TypeOfProductModel;
}
exports.default = default_1;
//# sourceMappingURL=typeOfProduct.model.js.map