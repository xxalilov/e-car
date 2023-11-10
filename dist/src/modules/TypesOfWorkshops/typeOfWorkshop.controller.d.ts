import { NextFunction, Request, Response } from "express";
import { RequestWithFile } from "../../interfaces/file-upload.interface";
declare class TypeOfWorkshopController {
    private typeOfWorkshopService;
    getAllTypeOfWorkshop(req: Request, res: Response, next: NextFunction): Promise<void>;
    createTypeOfWorkshop(req: RequestWithFile, res: Response, next: NextFunction): Promise<void>;
    updateTypeOfWorkshop(req: RequestWithFile, res: Response, next: NextFunction): Promise<void>;
    deleteTypeOfWorkshop(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export default TypeOfWorkshopController;
