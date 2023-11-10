"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../utils/database");
const isEpmty_1 = require("../../utils/isEpmty");
const HttpException_1 = require("../../exceptions/HttpException");
const file_1 = require("../../utils/file");
const sequelize_1 = require("sequelize");
class TypeOfProductService {
    constructor() {
        this.typeOfProduct = database_1.models.TypeOfProduct;
    }
    async getAllTypesOfProduct(lang) {
        if (lang === "all") {
            return await this.typeOfProduct.findAll({
                attributes: [
                    "id",
                    "uz",
                    "eng",
                    "ru",
                    "photo"
                ]
            });
        }
        return await this.typeOfProduct.findAll({
            attributes: [
                "id",
                [sequelize_1.Sequelize.literal(`COALESCE("${lang}")`), 'title'],
                "photo",
            ]
        });
    }
    async createTypeOfProduct(data) {
        if (!data.photo) {
            throw new HttpException_1.HttpException(400, "Please input photo");
        }
        return await this.typeOfProduct.create(data);
    }
    async updateTypeOfProduct(typeOfProductId, updateData) {
        if ((0, isEpmty_1.isEmpty)(typeOfProductId))
            throw new HttpException_1.HttpException(400, "Please input id");
        const typeOfProduct = await this.typeOfProduct.findByPk(typeOfProductId);
        if (!typeOfProduct)
            throw new HttpException_1.HttpException(400, "Type Of Workshop not found");
        if (updateData.photo && typeOfProduct.photo)
            (0, file_1.deleteFile)(typeOfProduct.photo);
        await typeOfProduct.update(updateData);
        return typeOfProduct;
    }
    async deleteTypeOfProduct(typeOfProductId) {
        if ((0, isEpmty_1.isEmpty)(typeOfProductId))
            throw new HttpException_1.HttpException(400, "Please input id");
        const typeOfProduct = await this.typeOfProduct.findByPk(typeOfProductId);
        if (!typeOfProduct)
            throw new HttpException_1.HttpException(400, "Type Of Workshop not found");
        if (typeOfProduct.photo)
            (0, file_1.deleteFile)(typeOfProduct.photo);
        await typeOfProduct.destroy();
        return typeOfProduct;
    }
}
exports.default = TypeOfProductService;
//# sourceMappingURL=typeOfProduct.service.js.map