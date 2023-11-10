import { NextFunction, Request, Response } from "express";
import { RequestWithFile } from "../../interfaces/file-upload.interface";
declare class AdvertisingController {
    private advertisingService;
    getAllAdvertisings(req: Request, res: Response, next: NextFunction): Promise<void>;
    createAdvertising(req: RequestWithFile, res: Response, next: NextFunction): Promise<void>;
    deleteAdvertising(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export default AdvertisingController;
