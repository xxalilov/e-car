"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const slugify_1 = tslib_1.__importDefault(require("slugify"));
const sequelize_1 = require("sequelize");
const database_1 = require("../../utils/database");
const pagination_1 = tslib_1.__importDefault(require("../../utils/pagination"));
const isEpmty_1 = require("../../utils/isEpmty");
const HttpException_1 = require("../../exceptions/HttpException");
class ProductService {
    constructor() {
        this.product = database_1.models.Product;
        this.typeOfProduct = database_1.models.TypeOfProduct;
    }
    async getAllProduct(page, pageSize, typeOfProductId, searchProduct, lang) {
        const paginationHelper = new pagination_1.default(this.product);
        if (searchProduct) {
            return await paginationHelper.paginate(page, pageSize, {
                slug: { [sequelize_1.Op.like]: `%${(0, slugify_1.default)(searchProduct.toLowerCase())}%` }
            }, [
                "id",
                [sequelize_1.Sequelize.literal(`COALESCE("title_${lang}")`), 'title'],
                [sequelize_1.Sequelize.literal(`COALESCE("address_${lang}")`), 'address'],
                [sequelize_1.Sequelize.literal(`COALESCE("description_${lang}")`), 'description'],
                "price",
                "lat",
                "long",
                "phone",
                "photos",
            ]);
        }
        if (typeOfProductId) {
            return await paginationHelper.paginate(page, pageSize, {
                typeOfProductId,
            }, [
                "id",
                [sequelize_1.Sequelize.literal(`COALESCE("title_${lang}")`), 'title'],
                [sequelize_1.Sequelize.literal(`COALESCE("address_${lang}")`), 'address'],
                [sequelize_1.Sequelize.literal(`COALESCE("description_${lang}")`), 'description'],
                "price",
                "lat",
                "long",
                "phone",
                "photos",
            ]);
        }
        else {
            return await paginationHelper.paginate(page, pageSize, {}, [
                "id",
                [sequelize_1.Sequelize.literal(`COALESCE("title_${lang}")`), 'title'],
                [sequelize_1.Sequelize.literal(`COALESCE("address_${lang}")`), 'address'],
                [sequelize_1.Sequelize.literal(`COALESCE("description_${lang}")`), 'description'],
                "price",
                "lat",
                "long",
                "phone",
                "photos",
            ], [["isTop", "DESC"]]);
        }
    }
    async getProductById(productId, lang) {
        if ((0, isEpmty_1.isEmpty)(productId))
            throw new HttpException_1.HttpException(400, "productId is empty");
        const product = await this.product.findByPk(productId, {
            attributes: [
                "id",
                [sequelize_1.Sequelize.literal(`COALESCE("title_${lang}")`), 'title'],
                [sequelize_1.Sequelize.literal(`COALESCE("address_${lang}")`), 'address'],
                [sequelize_1.Sequelize.literal(`COALESCE("description_${lang}")`), 'description'],
                "price",
                "lat",
                "long",
                "phone",
                "photos",
            ]
        });
        if (!product)
            throw new HttpException_1.HttpException(400, "Product not found");
        return product;
    }
    async createProduct(productData) {
        if ((0, isEpmty_1.isEmpty)(productData))
            throw new HttpException_1.HttpException(400, "Please input product data correctly");
        const typeOfProduct = await this.typeOfProduct.findByPk(productData.typeOfProductId);
        if (!typeOfProduct)
            throw new HttpException_1.HttpException(400, "Type not found");
        const product = await this.product.create(productData);
        return product;
    }
    async updateProduct(productData, productId) {
        const product = await this.product.findByPk(productId);
        if (!product)
            throw new HttpException_1.HttpException(400, "Product not found");
        // if (productData.photos && product.photos) deleteFile(product.photos);
        await product.update(productData);
        return product;
    }
    async deleteProduct(productId) {
        const product = await this.product.findByPk(productId);
        if (!product)
            throw new HttpException_1.HttpException(400, "Product not found");
        // if (productData.photos && product.photos) deleteFile(product.photos);
        await product.destroy();
        return product;
    }
}
exports.default = ProductService;
//# sourceMappingURL=product.service.js.map