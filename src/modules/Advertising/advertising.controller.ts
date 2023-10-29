import { NextFunction, Request, Response } from "express";
import path from "path";
import {RequestWithFile } from "../../interfaces/file-upload.interface";
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
      if (req.files && Object.keys(req.files).length > 0) {
        const baseDir = path.join(__dirname, '../../../');
        const timestamp = Date.now();
        let sampleFile = req.files.photo as any;
        const newFileName = `file_${timestamp}-${sampleFile.name.replace(/\s/g, "")}`;
        const uploadPath = path.join(baseDir, 'uploads', 'images', newFileName);
        sampleFile.mv(uploadPath, function (err) {
          if (err) next(err);
        });
        advertisingData.photo = `uploads/images/${newFileName}`;
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
