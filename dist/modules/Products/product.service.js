"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const slugify_1 = tslib_1.__importDefault(require("slugify"));
const sequelize_1 = require("sequelize");
const database_1 = require("../../utils/database");
const pagination_1 = tslib_1.__importDefault(require("../../utils/pagination"));
const isEpmty_1 = require("../../utils/isEpmty");
const HttpException_1 = require("../../exceptions/HttpException");
const file_1 = require("../../utils/file");
class ProductService {
    constructor() {
        this.product = database_1.models.Product;
        this.typeOfProduct = database_1.models.TypeOfProduct;
    }
    async getAllProduct(page, pageSize, typeOfProductId, searchProduct, lang) {
        const paginationHelper = new pagination_1.default(this.product);
        if (lang === "all") {
            if (searchProduct) {
                return await paginationHelper.paginate(page, pageSize, {
                    slug: { [sequelize_1.Op.like]: `%${(0, slugify_1.default)(searchProduct.toLowerCase())}%` }
                }, [
                    "id",
                    "title_uz",
                    "title_ru",
                    "title_eng",
                    "description_uz",
                    "description_ru",
                    "description_eng",
                    "address_uz",
                    "address_ru",
                    "address_eng",
                    "price",
                    "lat",
                    "long",
                    "phone",
                    "isTop",
                    "photos",
                ], [["isTop", "DESC"]]);
            }
            if (typeOfProductId) {
                return await paginationHelper.paginate(page, pageSize, {
                    typeOfProductId,
                }, [
                    "id",
                    "title_uz",
                    "title_ru",
                    "title_eng",
                    "description_uz",
                    "description_ru",
                    "description_eng",
                    "address_uz",
                    "address_ru",
                    "address_eng",
                    "price",
                    "lat",
                    "long",
                    "phone",
                    "isTop",
                    "photos",
                ], [["isTop", "DESC"]]);
            }
            else {
                return await paginationHelper.paginate(page, pageSize, {}, [
                    "id",
                    "title_uz",
                    "title_ru",
                    "title_eng",
                    "description_uz",
                    "description_ru",
                    "description_eng",
                    "address_uz",
                    "address_ru",
                    "address_eng",
                    "price",
                    "lat",
                    "long",
                    "phone",
                    "isTop",
                    "photos",
                ], [["isTop", "DESC"]]);
            }
        }
        else {
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
                ], [["isTop", "DESC"]]);
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
                ], [["isTop", "DESC"]]);
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
        return await this.product.create(productData);
    }
    async updateProduct(productData, productId) {
        const product = await this.product.findByPk(productId);
        if (!product)
            throw new HttpException_1.HttpException(400, "Product not found");
        if (productData.photos && product.photos.length > 0) {
            for (let photo of product.photos) {
                (0, file_1.deleteFile)(photo);
            }
        }
        await product.update(productData);
        return product;
    }
    async deleteProduct(productId) {
        const product = await this.product.findByPk(productId);
        if (!product)
            throw new HttpException_1.HttpException(400, "Product not found");
        if (product.photos && product.photos.length > 0) {
            for (let photo of product.photos) {
                (0, file_1.deleteFile)(photo);
            }
        }
        await product.destroy();
        return product;
    }
}
exports.default = ProductService;
//# sourceMappingURL=product.service.js.map