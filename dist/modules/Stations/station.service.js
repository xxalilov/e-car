"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const pagination_1 = tslib_1.__importDefault(require("../../utils/pagination"));
const database_1 = require("../../utils/database");
const HttpException_1 = require("../../exceptions/HttpException");
const geolib_1 = require("geolib");
class StationService {
    constructor() {
        this.station = database_1.models.Station;
    }
    async getAllStations(page, pageSize) {
        const paginationHelper = new pagination_1.default(this.station);
        const result = await paginationHelper.paginate(page, pageSize);
        return result;
    }
    async getStationsWithDistance(lat, long) {
        const allStations = await this.station.findAll();
        const filteredData = await allStations.filter((data) => {
            const distance = (0, geolib_1.getDistance)({ latitude: parseFloat(lat), longitude: parseFloat(long) }, {
                latitude: parseFloat(data.lat),
                longitude: parseFloat(data.long),
            });
            if (distance / 1000 <= 50) {
                return data;
            }
            else {
                return;
            }
        });
        return filteredData;
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