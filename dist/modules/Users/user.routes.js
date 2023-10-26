"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const user_controller_1 = tslib_1.__importDefault(require("./user.controller"));
const validation_middleware_1 = tslib_1.__importDefault(require("../../middlewares/validation.middleware"));
const user_dto_1 = require("./user.dto");
const auth_middleware_1 = tslib_1.__importDefault(require("../../middlewares/auth.middleware"));
const file_1 = require("../../utils/file");
class UserRouter {
    constructor() {
        this.path = "/user";
        this.router = (0, express_1.Router)();
        this.userController = new user_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, (0, auth_middleware_1.default)("user"), (0, validation_middleware_1.default)(user_dto_1.UpdateUserDto, "body"), 
        // upload.fields([{ name: "photo", maxCount: 1 }]),
        file_1.upload.single("photo"), this.userController.updateUser.bind(this.userController));
        this.router.get(`${this.path}`, (0, auth_middleware_1.default)("admin"), this.userController.getAllUsers.bind(this.userController));
        this.router.get(`${this.path}/:id`, this.userController.getUserById.bind(this.userController));
    }
}
exports.default = UserRouter;
//# sourceMappingURL=user.routes.js.map