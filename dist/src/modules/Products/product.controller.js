"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const product_service_1 = tslib_1.__importDefault(require("./product.service"));
class ProductController {
    constructor() {
        this.productService = new product_service_1.default();
    }
    async getAllProducts(req, res, next) {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        let typeOfProductId = null;
        let searchProduct = null;
        if (req.query.type) {
            typeOfProductId = req.query.type.toString();
        }
        if (req.query.searchData) {
            searchProduct = req.query.searchData.toString();
        }
        try {
            const findAllCarsData = await this.productService.getAllProduct(page, pageSize, typeOfProductId, searchProduct, req.query.lang);
            res.status(200).json(Object.assign(Object.assign({}, findAllCarsData), { message: "findAll" }));
        }
        catch (error) {
            next(error);
        }
    }
    async getProductById(req, res, next) {
        try {
            const findOneProductData = await this.productService.getProductById(req.params.id, req.query.lang);
            res.status(200).json({ data: findOneProductData, message: "findOne" });
        }
        catch (error) {
            next(error);
        }
    }
    async createProduct(req, res, next) {
        try {
            const productData = req.body;
            if (req.files && Object.keys(req.files).length > 0) {
                const baseDir = path_1.default.join(__dirname, '../../../');
                const files = req.files.photo;
                const photos = [];
                if (files.length > 0) {
                    for (let p of files) {
                        const newFileName = `file_${Date.now()}-${p.name.replace(/\s/g, "")}`;
                        const uploadPath = path_1.default.join(baseDir, 'uploads', 'images', newFileName);
                        p.mv(uploadPath, function (err) {
                            if (err)
                                next(err);
                        });
                        photos.push(`uploads/images/${newFileName}`);
                    }
                }
                else {
                    const newFileName = `file_${Date.now()}-${files.name.replace(/\s/g, "")}`;
                    const uploadPath = path_1.default.join(baseDir, 'uploads', 'images', newFileName);
                    files.mv(uploadPath, function (err) {
                        if (err)
                            next(err);
                    });
                    photos.push(`uploads/images/${newFileName}`);
                }
                productData.photos = photos;
            }
            const newProduct = await this.productService.createProduct(productData);
            res.status(201).json({ data: newProduct, message: "created" });
        }
        catch (error) {
            next(error);
        }
    }
    async updateProduct(req, res, next) {
        try {
            const productData = req.body;
            const productId = req.params.id;
            if (req.files && Object.keys(req.files).length > 0) {
                const baseDir = path_1.default.join(__dirname, '../../../');
                const files = req.files.photo;
                const photos = [];
                if (files.length > 0) {
                    for (let p of files) {
                        const newFileName = `file_${Date.now()}-${p.name.replace(/\s/g, "")}`;
                        const uploadPath = path_1.default.join(baseDir, 'uploads', 'images', newFileName);
                        p.mv(uploadPath, function (err) {
                            if (err)
                                next(err);
                        });
                        photos.push(`uploads/images/${newFileName}`);
                    }
                }
                else {
                    const newFileName = `file_${Date.now()}-${files.name.replace(/\s/g, "")}`;
                    const uploadPath = path_1.default.join(baseDir, 'uploads', 'images', newFileName);
                    files.mv(uploadPath, function (err) {
                        if (err)
                            next(err);
                    });
                    photos.push(`uploads/images/${newFileName}`);
                }
                productData.photos = photos;
            }
            const updatedProduct = await this.productService.updateProduct(productData, productId);
            res.status(200).json({ data: updatedProduct, message: "updated" });
        }
        catch (error) {
            next(error);
        }
    }
    async deleteProduct(req, res, next) {
        try {
            const productId = req.params.id;
            const deletedProduct = await this.productService.deleteProduct(productId);
            res.status(200).json({ data: deletedProduct, message: "deleted" });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = ProductController;
//# sourceMappingURL=product.controller.js.map