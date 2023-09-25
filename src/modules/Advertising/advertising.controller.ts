import { NextFunction, Request, Response } from "express";
import { Photo, RequestWithFile } from "../../interfaces/file-upload.interface";
import AdvertisingService from "./advertising.service";

class AdvertisingController {
  private advertisingService = new AdvertisingService();

  public async getAllAdvertisings(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const findAllCarsData =
        await this.advertisingService.getAllAdvertisings();
      res.status(200).json({ data: findAllCarsData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  }

  public async createAdvertising(
    req: RequestWithFile,
    res: Response,
    next: NextFunction
  ) {
    try {
      const advertisingData = req.body;
      const photo: Photo[] = req.files.photo;
      if (photo) {
        advertisingData.photo = photo[0].path;
      }
      const newAdvertising = await this.advertisingService.createAdvertising(
        advertisingData
      );
      res.status(201).json({ data: newAdvertising, message: "created" });
    } catch (error) {
      next(error);
    }
  }

  public async deleteAdvertising(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const advertisingId = req.params.id;
      const deletedAdvertising =
        await this.advertisingService.deleteAdvertising(advertisingId);
      res.status(200).json({ data: deletedAdvertising, message: "deleted" });
    } catch (error) {
      next(error);
    }
  }
}

export default AdvertisingController;
