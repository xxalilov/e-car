import PaginationHelper, { ResultInterface } from "../../utils/pagination";
import { models } from "../../utils/database";
import { Station } from "./station.interface";
import { CreateStationDto } from "./station.dto";
import { HttpException } from "../../exceptions/HttpException";

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
