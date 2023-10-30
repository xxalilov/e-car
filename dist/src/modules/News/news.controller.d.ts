import { NextFunction, Request, Response } from "express";
import { RequestWithFile } from "../../interfaces/file-upload.interface";
declare class NewsController {
    private newsService;
    getAllNews(req: Request, res: Response, next: NextFunction): Promise<void>;
    getNewsById(req: Request, res: Response, next: NextFunction): Promise<void>;
    createNews(req: RequestWithFile, res: Response, next: NextFunction): Promise<void>;
    updateNews(req: RequestWithFile, res: Response, next: NextFunction): Promise<void>;
    deleteNewsById(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export default NewsController;
