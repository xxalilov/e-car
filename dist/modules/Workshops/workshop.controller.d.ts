import { NextFunction, Request, Response } from "express";
declare class WorkshopController {
    private workshopService;
    getAllWorkshops(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAllWorkshopsByType(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAllWorkshopsWithDistance(req: Request, res: Response, next: NextFunction): Promise<void>;
    createWorkshop(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateWorkshop(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteWorkshop(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export default WorkshopController;
