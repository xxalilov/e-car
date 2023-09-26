import { ResultInterface } from "../../utils/pagination";
import { Station } from "./station.interface";
import { CreateStationDto } from "./station.dto";
declare class StationService {
    station: typeof import("./station.model").StationModel;
    getAllStations(page: number, pageSize: number): Promise<ResultInterface>;
    createStation(stationData: CreateStationDto): Promise<Station>;
    deleteStation(stationId: string): Promise<Station>;
}
export default StationService;
