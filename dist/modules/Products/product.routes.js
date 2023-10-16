"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const auth_middleware_1 = tslib_1.__importDefault(require("../../middlewares/auth.middleware"));
const file_1 = require("../../utils/file");
const product_controller_1 = tslib_1.__importDefault(require("./product.controller"));
class ProductRouter {
    constructor() {
        this.path = "/products";
        this.router = (0, express_1.Router)();
        this.productController = new product_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, (0, auth_middleware_1.default)("admin"), 
        // validationMiddleware(CreateCarDto, "body"),
        file_1.upload.fields([{ name: "photo", maxCount: 6 }]), this.productController.createProduct.bind(this.productController));
        this.router.put(`${this.path}/:id`, (0, auth_middleware_1.default)("admin"), 
        // validationMiddleware(UpdateCarDto, "body"),
        file_1.upload.fields([{ name: "photo", maxCount: 1 }]), this.productController.updateProduct.bind(this.productController));
        this.router.get(`${this.path}`, (0, auth_middleware_1.default)("all"), this.productController.getAllProducts.bind(this.productController));
        this.router.delete(`${this.path}/:id`, (0, auth_middleware_1.default)("admin"), this.productController.deleteProduct.bind(this.productController));
    }
}
exports.default = ProductRouter;
//# sourceMappingURL=product.routes.js.map