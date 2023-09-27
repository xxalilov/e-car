import { NextFunction, Request, Response } from "express";
import StationService from "./station.service";
declare class StationController {
    stationService: StationService;
    getAllStations(req: Request, res: Response, next: NextFunction): Promise<void>;
    getStationsWithDistance(req: Request, res: Response, next: NextFunction): Promise<void>;
    createStation(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteStation(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export default StationController;
