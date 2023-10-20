"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const validation_middleware_1 = tslib_1.__importDefault(require("../../middlewares/validation.middleware"));
const auth_middleware_1 = tslib_1.__importDefault(require("../../middlewares/auth.middleware"));
const workshop_controller_1 = tslib_1.__importDefault(require("./workshop.controller"));
const workshop_dto_1 = require("./workshop.dto");
const auth_middleware_2 = tslib_1.__importDefault(require("../../middlewares/auth.middleware"));
const language_middleware_1 = tslib_1.__importDefault(require("../../middlewares/language.middleware"));
class WorkshopRouter {
    constructor() {
        this.path = "/workshop";
        this.router = (0, express_1.Router)();
        this.workshopController = new workshop_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, (0, auth_middleware_1.default)("admin"), (0, validation_middleware_1.default)(workshop_dto_1.CreateWorkshopDto, "body"), this.workshopController.createWorkshop.bind(this.workshopController));
        this.router.put(`${this.path}/:id`, (0, auth_middleware_1.default)("admin"), (0, validation_middleware_1.default)(workshop_dto_1.UpdateWorkshopDto, "body"), this.workshopController.updateWorkshop.bind(this.workshopController));
        this.router.get(`${this.path}`, (0, auth_middleware_1.default)("all"), auth_middleware_2.default, this.workshopController.getAllWorkshops.bind(this.workshopController));
        this.router.get(`${this.path}/:id`, (0, auth_middleware_1.default)("all"), language_middleware_1.default, this.workshopController.getAllWorkshopsByType.bind(this.workshopController));
        this.router.delete(`${this.path}/:id`, (0, auth_middleware_1.default)("all"), this.workshopController.deleteWorkshop.bind(this.workshopController));
    }
}
exports.default = WorkshopRouter;
//# sourceMappingURL=workshop.routes.js.map