"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const station_service_1 = tslib_1.__importDefault(require("./station.service"));
class StationController {
    constructor() {
        this.stationService = new station_service_1.default();
    }
    async getAllStations(req, res, next) {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        try {
            const findAllStationsData = await this.stationService.getAllStations(page, pageSize);
            res.status(200).json(Object.assign(Object.assign({}, findAllStationsData), { message: "findAll" }));
        }
        catch (error) {
            next(error);
        }
    }
    async getStationsWithDistance(req, res, next) {
        const lat = req.query.lat.toString();
        const long = req.query.long.toString();
        try {
            const stations = await this.stationService.getStationsWithDistance(lat, long, req.query.lang);
            res.status(201).json({ data: stations, message: "find" });
        }
        catch (error) {
            next(error);
        }
    }
    async createStation(req, res, next) {
        const stationData = req.body;
        try {
            const station = await this.stationService.createStation(stationData);
            res.status(201).json({ data: station, message: "create" });
        }
        catch (error) {
            next(error);
        }
    }
    async deleteStation(req, res, next) {
        const stationId = req.params.id;
        try {
            const station = await this.stationService.deleteStation(stationId);
            res.status(200).json({ data: station, message: "delete" });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = StationController;
//# sourceMappingURL=station.controller.js.map