"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const pagination_1 = tslib_1.__importDefault(require("../../utils/pagination"));
const database_1 = require("../../utils/database");
const HttpException_1 = require("../../exceptions/HttpException");
class StationService {
    constructor() {
        this.station = database_1.models.Station;
    }
    async getAllStations(page, pageSize) {
        const paginationHelper = new pagination_1.default(this.station);
        const result = await paginationHelper.paginate(page, pageSize);
        return result;
    }
    async createStation(stationData) {
        const station = await this.station.create(stationData);
        return station;
    }
    async deleteStation(stationId) {
        const station = await this.station.findByPk(stationId);
        if (!station)
            throw new HttpException_1.HttpException(404, "station not found");
        await station.destroy();
        return station;
    }
}
exports.default = StationService;
//# sourceMappingURL=station.service.js.map