"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const validation_middleware_1 = tslib_1.__importDefault(require("../../middlewares/validation.middleware"));
const auth_middleware_1 = tslib_1.__importDefault(require("../../middlewares/auth.middleware"));
const station_controller_1 = tslib_1.__importDefault(require("./station.controller"));
const station_dto_1 = require("./station.dto");
class StationRouter {
    constructor() {
        this.path = "/station";
        this.router = (0, express_1.Router)();
        this.stationController = new station_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, (0, auth_middleware_1.default)("admin"), (0, validation_middleware_1.default)(station_dto_1.CreateStationDto, "body"), this.stationController.createStation.bind(this.stationController));
        this.router.get(`${this.path}`, (0, auth_middleware_1.default)("all"), this.stationController.getAllStations.bind(this.stationController));
        this.router.get(`${this.path}/:id`, (0, auth_middleware_1.default)("all"), this.stationController.deleteStation.bind(this.stationController));
    }
}
exports.default = StationRouter;
//# sourceMappingURL=station.routes.js.map