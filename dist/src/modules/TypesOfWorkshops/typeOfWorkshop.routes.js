"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const auth_middleware_1 = tslib_1.__importDefault(require("../../middlewares/auth.middleware"));
const typeOfWorkshop_controller_1 = tslib_1.__importDefault(require("./typeOfWorkshop.controller"));
const language_middleware_1 = tslib_1.__importDefault(require("../../middlewares/language.middleware"));
class TypeOfWorkshopRouter {
    constructor() {
        this.path = "/types-of-workshops";
        this.router = (0, express_1.Router)();
        this.typesOfWorkshopController = new typeOfWorkshop_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, (0, auth_middleware_1.default)("admin"), 
        // validationMiddleware(CreateTypeOfWorkshopDto, "body"),
        this.typesOfWorkshopController.createTypeOfWorkshop.bind(this.typesOfWorkshopController));
        this.router.put(`${this.path}/:id`, (0, auth_middleware_1.default)("admin"), 
        // validationMiddleware(CreateTypeOfWorkshopDto, "body"),
        this.typesOfWorkshopController.updateTypeOfWorkshop.bind(this.typesOfWorkshopController));
        this.router.delete(`${this.path}/:id`, (0, auth_middleware_1.default)("admin"), this.typesOfWorkshopController.deleteTypeOfWorkshop.bind(this.typesOfWorkshopController));
        this.router.get(`${this.path}`, (0, auth_middleware_1.default)("all"), language_middleware_1.default, this.typesOfWorkshopController.getAllTypeOfWorkshop.bind(this.typesOfWorkshopController));
    }
}
exports.default = TypeOfWorkshopRouter;
//# sourceMappingURL=typeOfWorkshop.routes.js.map