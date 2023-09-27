"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const product_service_1 = tslib_1.__importDefault(require("./product.service"));
class ProductController {
    constructor() {
        this.productService = new product_service_1.default();
    }
    async getAllProducts(req, res, next) {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        try {
            const findAllCarsData = await this.productService.getAllProduct(page, pageSize);
            res.status(200).json(Object.assign(Object.assign({}, findAllCarsData), { message: "findAll" }));
        }
        catch (error) {
            next(error);
        }
    }
    async getProductById(req, res, next) {
        try {
            const findOneProductData = await this.productService.getProductById(req.params.id);
            res.status(200).json({ data: findOneProductData, message: "findOne" });
        }
        catch (error) {
            next(error);
        }
    }
    async createProduct(req, res, next) {
        try {
            const productData = req.body;
            console.log("PRODUCT DATA", productData);
            console.log("FILES", req.files);
            if (req.files && req.files.photo) {
                const photo = req.files.photo;
                let photos = [];
                for (let p of photo) {
                    photos.push(p.path);
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
            const photo = req.files.photo;
            if (photo) {
                productData.photo = photo[0].path;
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
    async searchProduct(req, res, next) {
        try {
            const searchData = req.query.searchData.toString();
            const foundProducts = await this.productService.searchProduct(searchData);
            res.status(200).json({ data: foundProducts, message: "found" });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = ProductController;
//# sourceMappingURL=product.controller.js.map