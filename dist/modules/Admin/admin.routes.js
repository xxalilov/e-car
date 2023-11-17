"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const admin_controller_1 = tslib_1.__importDefault(require("./admin.controller"));
const validation_middleware_1 = tslib_1.__importDefault(require("../../middlewares/validation.middleware"));
const admin_dto_1 = require("./admin.dto");
const auth_middleware_1 = tslib_1.__importDefault(require("../../middlewares/auth.middleware"));
class AdminRouter {
    constructor() {
        this.path = "/admin";
        this.router = (0, express_1.Router)();
        this.adminController = new admin_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, (0, auth_middleware_1.default)("superadmin"), (0, validation_middleware_1.default)(admin_dto_1.CreateAdmin, "body"), this.adminController.createAdmin.bind(this.adminController));
        this.router.delete(`${this.path}/:id`, (0, auth_middleware_1.default)("superadmin"), this.adminController.deleteAdminById.bind(this.adminController));
        this.router.put(`${this.path}/email`, (0, auth_middleware_1.default)("admin"), (0, validation_middleware_1.default)(admin_dto_1.UpdateAdminEmail, "body"), this.adminController.updateAdminEmail.bind(this.adminController));
        this.router.put(`${this.path}/password`, (0, auth_middleware_1.default)("admin"), (0, validation_middleware_1.default)(admin_dto_1.UpdateAdminPassword, "body"), this.adminController.updateAdminPassword.bind(this.adminController));
        this.router.put(`${this.path}/:id`, (0, auth_middleware_1.default)("superadmin"), this.adminController.updateAdminDetails.bind(this.adminController));
        this.router.get(`${this.path}`, (0, auth_middleware_1.default)("superadmin"), this.adminController.getAllAdmins.bind(this.adminController));
    }
}
exports.default = AdminRouter;
//# sourceMappingURL=admin.routes.js.map