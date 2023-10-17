import PaginationHelper, {ResultInterface} from "../../utils/pagination";
import {models} from "../../utils/database";
import {Station} from "./station.interface";
import {CreateStationDto} from "./station.dto";
import {HttpException} from "../../exceptions/HttpException";
import {getDistance} from "geolib";
import {Sequelize} from "sequelize";

class StationService {
    public station = models.Station;

    public async getAllStations(
        page: number,
        pageSize: number
    ): Promise<ResultInterface> {
        const paginationHelper = new PaginationHelper(this.station);
        const result = await paginationHelper.paginate(page, pageSize);
        return result;
    }

    public async getStationsWithDistance(
        lat: string,
        long: string,
        lang: string
    ): Promise<Station[]> {
        const allStations = await this.station.findAll({
            attributes: [
                "id",
                [Sequelize.literal(`COALESCE("title_${lang}")`), 'title'],
                "lat",
                "long",

            ]
        });
        const filteredData = await allStations.filter((data) => {
            const distance = getDistance(
                {latitude: parseFloat(lat), longitude: parseFloat(long)},
                {
                    latitude: parseFloat(data.lat),
                    longitude: parseFloat(data.long),
                }
            );

            if (distance / 1000 <= 50) {
                return data;
            } else {
                return;
            }
        });

        return filteredData;
    }

    public async createStation(stationData: CreateStationDto): Promise<Station> {
        const station = await this.station.create(stationData);
        return station;
    }

    public async deleteStation(stationId: string): Promise<Station> {
        const station = await this.station.findByPk(stationId);
        if (!station) throw new HttpException(404, "station not found");
        await station.destroy();
        return station;
    }
}

export default StationService;
