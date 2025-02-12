import { NextFunction, Request, Response } from "express";
import path from 'path';
import { RequestWithUser } from "../../modules/Auth/auth.interface";
import CarService from "./car.service";
import { Car } from "./car.interface";
import { Photo, RequestWithFile } from "../../interfaces/file-upload.interface";

class CarController {
  private carService = new CarService();

  public async getAllCar(req: Request, res: Response, next: NextFunction) {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    try {
      const findAllCarsData = await this.carService.getAllCars(page, pageSize);
      res.status(200).json({ ...findAllCarsData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  }

  public async getCarById(req: Request, res: Response, next: NextFunction) {
    try {
      const findOneCarData: Car = await this.carService.getCarById(
        req.params.id
      );
      res.status(200).json({ data: findOneCarData, message: "findOne" });
    } catch (error) {
      next(error);
    }
  }

  public async getUserCars(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const findUserCars = await this.carService.getUserCars(req.user.id.toString());
      res.status(200).json({ data: findUserCars, message: "findAll" });
    } catch (error) {
      next(error);
    }
  }

  public async createCar(
    req: RequestWithFile,
    res: Response,
    next: NextFunction
  ) {
    try {
      const carData = req.body;
      const userId = req.user.id;
      // if (req.files && req.files.photo) {
      //   const photo: Photo[] = req.files.photo;
      //   carData.photo = photo[0].path;
      // }
      if (req.files && Object.keys(req.files).length > 0) {
        const baseDir = path.join(__dirname, '../../../');
        const timestamp = Date.now();
        let sampleFile = req.files.photo as any;
        const newFileName = `file_${timestamp}-${sampleFile.name.replace(/\s/g, "")}`;
        const uploadPath = path.join(baseDir, 'uploads', 'images', newFileName);
        sampleFile.mv(uploadPath, function(err) {
          if (err) next(err);
        });
        carData.photo = `uploads/images/${newFileName}`;
      }
      const newCar = await this.carService.createCar(carData, userId.toString());
      res.status(201).json({ data: newCar, message: "created" });
    } catch (error) {
      next(error);
    }
  }

  public async updateCar(
    req: RequestWithFile,
    res: Response,
    next: NextFunction
  ) {
    try {
      const carData = req.body;
      const carId = req.params.id;
      // const photo: Photo[] = req.files.photo;
      // if (photo) {
      //   carData.photo = photo[0].path;
      // }
      if (req.files && Object.keys(req.files).length > 0) {
        const baseDir = path.join(__dirname, '../../../');
        const timestamp = Date.now();
        let sampleFile = req.files.photo as any;
        const newFileName = `file_${timestamp}-${sampleFile.name.replace(/\s/g, "")}`;
        const uploadPath = path.join(baseDir, 'uploads', 'images', newFileName);
        sampleFile.mv(uploadPath, function(err) {
          if (err) next(err);
        });
        carData.photo = `uploads/images/${newFileName}`;
      }
      const updatedCar = await this.carService.updateCar(carData, carId);
      res.status(200).json({ data: updatedCar, message: "updated" });
    } catch (error) {
      next(error);
    }
  }

  public async deleteCarById(req: Request, res: Response, next: NextFunction) {
    try {
      const deletedCarData: Car = await this.carService.deleteCar(
        req.params.id
      );
      res.status(200).json({ data: deletedCarData, message: "deleted" });
    } catch (error) {
      next(error);
    }
  }
}

export default CarController;
