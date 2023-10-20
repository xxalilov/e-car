"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructionModel = void 0;
const sequelize_1 = require("sequelize");
class InstructionModel extends sequelize_1.Model {
}
exports.InstructionModel = InstructionModel;
function default_1(sequelize) {
    InstructionModel.init({
        id: {
            type: sequelize_1.DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        title_uz: {
            type: sequelize_1.DataTypes.STRING,
        },
        title_ru: {
            type: sequelize_1.DataTypes.STRING,
        },
        title_eng: {
            type: sequelize_1.DataTypes.STRING,
        },
        description_uz: {
            type: sequelize_1.DataTypes.STRING
        },
        description_ru: {
            type: sequelize_1.DataTypes.STRING
        },
        description_eng: {
            type: sequelize_1.DataTypes.STRING
        },
        link: {
            type: sequelize_1.DataTypes.STRING
        },
        type: {
            type: sequelize_1.DataTypes.STRING
        },
        typeId: {
            type: sequelize_1.DataTypes.STRING
        }
    }, {
        tableName: "instructions",
        sequelize,
        timestamps: true
    });
    return InstructionModel;
}
exports.default = default_1;
//# sourceMappingURL=instruction.model.js.map