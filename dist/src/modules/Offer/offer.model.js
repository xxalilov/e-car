"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferModel = void 0;
const sequelize_1 = require("sequelize");
class OfferModel extends sequelize_1.Model {
}
exports.OfferModel = OfferModel;
function default_1(sequelize) {
    OfferModel.init({
        id: {
            primaryKey: true,
            type: sequelize_1.DataTypes.BIGINT,
            autoIncrement: true
        },
        text: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: "offers",
        sequelize,
    });
    return OfferModel;
}
exports.default = default_1;
//# sourceMappingURL=offer.model.js.map