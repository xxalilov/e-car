"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const car_controller_1 = tslib_1.__importDefault(require("./car.controller"));
const auth_middleware_1 = tslib_1.__importDefault(require("../../middlewares/auth.middleware"));
class CarRouter {
    constructor() {
        this.path = "/car";
        this.router = (0, express_1.Router)();
        this.carController = new car_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, (0, auth_middleware_1.default)("user"), 
        // validationMiddleware(CreateCarDto, "body"),
        // upload.fields([{ name: "photo", maxCount: 1 }]),
        this.carController.createCar.bind(this.carController));
        this.router.get(`${this.path}/user`, (0, auth_middleware_1.default)("user"), this.carController.getUserCars.bind(this.carController));
        this.router.put(`${this.path}/:id`, (0, auth_middleware_1.default)("user"), 
        // validationMiddleware(UpdateCarDto, "body"),
        // upload.fields([{ name: "photo", maxCount: 1 }]),
        this.carController.updateCar.bind(this.carController));
        this.router.get(`${this.path}`, (0, auth_middleware_1.default)("admin"), this.carController.getAllCar.bind(this.carController));
        this.router.get(`${this.path}/:id`, (0, auth_middleware_1.default)("all"), this.carController.getCarById.bind(this.carController));
        this.router.delete(`${this.path}/:id`, (0, auth_middleware_1.default)("user"), this.carController.deleteCarById.bind(this.carController));
    }
}
exports.default = CarRouter;
//# sourceMappingURL=car.routes.js.map