import { NextFunction, Request, Response } from "express";
import StationService from "./station.service";

class StationController {
  public stationService = new StationService();

  public async getAllStations(req: Request, res: Response, next: NextFunction) {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    try {
      const findAllStationsData = await this.stationService.getAllStations(
        page,
        pageSize
      );
      res.status(200).json({ ...findAllStationsData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  }

  public async getStationsWithDistance(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const lat = req.query.lat.toString();
    const long = req.query.long.toString();
    try {
      const stations = await this.stationService.getStationsWithDistance(
        lat,
        long
      );
      res.status(201).json({ data: stations, message: "find" });
    } catch (error) {
      next(error);
    }
  }

  public async createStation(req: Request, res: Response, next: NextFunction) {
    const stationData = req.body;
    try {
      const station = await this.stationService.createStation(stationData);
      res.status(201).json({ data: station, message: "create" });
    } catch (error) {
      next(error);
    }
  }

  public async deleteStation(req: Request, res: Response, next: NextFunction) {
    const stationId = req.params.id;
    try {
      const station = await this.stationService.deleteStation(stationId);
      res.status(200).json({ data: station, message: "delete" });
    } catch (error) {
      next(error);
    }
  }
}

export default StationController;
