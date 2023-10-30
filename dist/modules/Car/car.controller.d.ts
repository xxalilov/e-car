import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "../Auth/auth.interface";
import { RequestWithFile } from "../../interfaces/file-upload.interface";
declare class CarController {
    private carService;
    getAllCar(req: Request, res: Response, next: NextFunction): Promise<void>;
    getCarById(req: Request, res: Response, next: NextFunction): Promise<void>;
    getUserCars(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
    createCar(req: RequestWithFile, res: Response, next: NextFunction): Promise<void>;
    updateCar(req: RequestWithFile, res: Response, next: NextFunction): Promise<void>;
    deleteCarById(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export default CarController;
