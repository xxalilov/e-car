"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const auth_middleware_1 = tslib_1.__importDefault(require("../../middlewares/auth.middleware"));
const advertising_controller_1 = tslib_1.__importDefault(require("./advertising.controller"));
class AdvertisingRouter {
    constructor() {
        this.path = "/advertising";
        this.router = (0, express_1.Router)();
        this.advertisingController = new advertising_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, (0, auth_middleware_1.default)("admin"), this.advertisingController.createAdvertising.bind(this.advertisingController));
        this.router.delete(`${this.path}/:id`, (0, auth_middleware_1.default)("admin"), this.advertisingController.deleteAdvertising.bind(this.advertisingController));
        this.router.get(`${this.path}`, (0, auth_middleware_1.default)("all"), this.advertisingController.getAllAdvertisings.bind(this.advertisingController));
    }
}
exports.default = AdvertisingRouter;
//# sourceMappingURL=advertising.routes.js.map