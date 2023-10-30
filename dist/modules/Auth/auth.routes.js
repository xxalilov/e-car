"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const auth_controller_1 = tslib_1.__importDefault(require("./auth.controller"));
const validation_middleware_1 = tslib_1.__importDefault(require("../../middlewares/validation.middleware"));
const admin_dto_1 = require("../Admin/admin.dto");
const auth_middleware_1 = tslib_1.__importDefault(require("../../middlewares/auth.middleware"));
class AuthRouter {
    constructor() {
        this.path = "/auth";
        this.router = (0, express_1.Router)();
        this.authController = new auth_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/send-confirmation`, this.authController.sendConfirmation.bind(this.authController));
        this.router.post(`${this.path}/check-confirmation`, this.authController.checkConfirmation.bind(this.authController));
        this.router.post(`${this.path}/signin/admin`, (0, validation_middleware_1.default)(admin_dto_1.CreateAdminDto, "body"), this.authController.signInAdmin.bind(this.authController));
        this.router.get(`${this.path}/user`, (0, auth_middleware_1.default)("all"), this.authController.getCurrentUser.bind(this.authController));
    }
}
exports.default = AuthRouter;
//# sourceMappingURL=auth.routes.js.map