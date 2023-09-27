"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../utils/database");
const isEpmty_1 = require("../../utils/isEpmty");
const HttpException_1 = require("../../exceptions/HttpException");
const file_1 = require("../../utils/file");
class TypeOfProductService {
    constructor() {
        this.typeOfProduct = database_1.models.TypeOfProduct;
    }
    async getAllTypesOfProduct() {
        const typesOfProducts = await this.typeOfProduct.findAll();
        return typesOfProducts;
    }
    async createTypeOfProduct(data) {
        if (!data.photo) {
            throw new HttpException_1.HttpException(400, "Please input photo");
        }
        const typeOfProduct = await this.typeOfProduct.create(data);
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