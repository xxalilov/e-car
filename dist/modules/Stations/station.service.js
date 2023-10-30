"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const pagination_1 = tslib_1.__importDefault(require("../../utils/pagination"));
const database_1 = require("../../utils/database");
const HttpException_1 = require("../../exceptions/HttpException");
const geolib_1 = require("geolib");
const sequelize_1 = require("sequelize");
class StationService {
    constructor() {
        this.station = database_1.models.Station;
    }
    async getAllStations(page, pageSize) {
        const paginationHelper = new pagination_1.default(this.station);
        const result = await paginationHelper.paginate(page, pageSize);
        return result;
    }
    async getStationsWithDistance(lat, long, lang) {
        const allStations = await this.station.findAll({
            attributes: [
                "id",
                [sequelize_1.Sequelize.literal(`COALESCE("title_${lang}")`), 'title'],
                "lat",
                "long",
            ]
        });
        return allStations.filter((data) => {
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
    }
    async createStation(stationData) {
        return await this.station.create(stationData);
    }
    async updateStation(stationId, updateData) {
        const station = await this.station.findByPk(stationId);
        if (!station)
            throw new HttpException_1.HttpException(404, "station not found");
        await station.update(updateData);
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