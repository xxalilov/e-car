"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const user_controller_1 = tslib_1.__importDefault(require("./user.controller"));
const auth_middleware_1 = tslib_1.__importDefault(require("../../middlewares/auth.middleware"));
class UserRouter {
    constructor() {
        this.path = "/user";
        this.router = (0, express_1.Router)();
        this.userController = new user_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.put(`${this.path}`, (0, auth_middleware_1.default)("user"), 
        // validationMiddleware(UpdateUserDto, "body"),
        // upload.fields([{ name: "photo", maxCount: 1 }]),
        this.userController.updateUser.bind(this.userController));
        this.router.get(`${this.path}`, (0, auth_middleware_1.default)("admin"), this.userController.getAllUsers.bind(this.userController));
        this.router.get(`${this.path}/:id`, this.userController.getUserById.bind(this.userController));
    }
}
exports.default = UserRouter;
//# sourceMappingURL=user.routes.js.map