import { NextFunction, Request, Response } from "express";
import { RequestWithFile } from "../../interfaces/file-upload.interface";
declare class TypeOfProductController {
    private typeOfProductService;
    getAllTypeOfProduct(req: Request, res: Response, next: NextFunction): Promise<void>;
    createTypeOfProduct(req: RequestWithFile, res: Response, next: NextFunction): Promise<void>;
    deleteTypeOfProduct(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export default TypeOfProductController;
