"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const auth_middleware_1 = tslib_1.__importDefault(require("../../middlewares/auth.middleware"));
const file_1 = require("../../utils/file");
const typeOfProduct_controller_1 = tslib_1.__importDefault(require("./typeOfProduct.controller"));
const language_middleware_1 = tslib_1.__importDefault(require("../../middlewares/language.middleware"));
class TypeOfProductRouter {
    constructor() {
        this.path = "/types-of-products";
        this.router = (0, express_1.Router)();
        this.typesOfProductController = new typeOfProduct_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, (0, auth_middleware_1.default)("admin"), 
        // validationMiddleware(CreateTypeOfWorkshopDto, "body"),
        file_1.upload.fields([{ name: "photo", maxCount: 1 }]), this.typesOfProductController.createTypeOfProduct.bind(this.typesOfProductController));
        this.router.delete(`${this.path}/:id`, (0, auth_middleware_1.default)("admin"), this.typesOfProductController.deleteTypeOfProduct.bind(this.typesOfProductController));
        this.router.get(`${this.path}`, (0, auth_middleware_1.default)("all"), language_middleware_1.default, this.typesOfProductController.getAllTypeOfProduct.bind(this.typesOfProductController));
    }
}
exports.default = TypeOfProductRouter;
//# sourceMappingURL=typeOfProduct.routes.js.map