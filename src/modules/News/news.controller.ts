import {NextFunction, Request, Response} from "express";
import path from "path";
import {RequestWithFile} from "../../interfaces/file-upload.interface";
import NewsService from "./news.service";
import {News} from "./news.interface";

class NewsController {
    private newsService = new NewsService();

    public async getAllNews(req: Request, res: Response, next: NextFunction) {
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 10;
        try {
            const findAllNewsData = await this.newsService.getAllNews(page, pageSize, req.query.lang as string);
            res.status(200).json({...findAllNewsData, message: "findAll"});
        } catch (error) {
            next(error);
        }
    }

    public async getNewsById(req: Request, res: Response, next: NextFunction) {
        try {
            const findOneNewsData: News = await this.newsService.getNewsById(
                req.params.id,
                req.query.lang as string
            );
            res.status(200).json({data: findOneNewsData, message: "findOne"});
        } catch (error) {
            next(error);
        }
    }

    public async createNews(
        req: RequestWithFile,
        res: Response,
        next: NextFunction
    ) {
        try {
            const newsData = req.body;
            if (req.files && Object.keys(req.files).length > 0) {
                const baseDir = path.join(__dirname, '../../../');
                const timestamp = Date.now();
                let sampleFile = req.files.photo as any;
                const newFileName = `file_${timestamp}-${sampleFile.name.replace(/\s/g, "")}`;
                const uploadPath = path.join(baseDir, 'uploads', 'images', newFileName);
                sampleFile.mv(uploadPath, function (err) {
                    if (err) next(err);
                });
                newsData.photo = `uploads/images/${newFileName}`;
            }
            const newNews = await this.newsService.createNews(newsData);
            res.status(201).json({data: newNews, message: "created"});
        } catch (error) {
            next(error);
        }
    }

    public async updateNews(
        req: RequestWithFile,
        res: Response,
        next: NextFunction
    ) {
        try {
            const newsData = req.body;
            const newsId = req.params.id;
            if (req.files && Object.keys(req.files).length > 0) {
                const baseDir = path.join(__dirname, '../../../');
                const timestamp = Date.now();
                let sampleFile = req.files.photo as any;
                const newFileName = `file_${timestamp}-${sampleFile.name.replace(/\s/g, "")}`;
                const uploadPath = path.join(baseDir, 'uploads', 'images', newFileName);
                sampleFile.mv(uploadPath, function (err) {
                    if (err) next(err);
                });
                newsData.photo = `uploads/images/${newFileName}`;
            }
            const updatedNews = await this.newsService.updateNews(newsData, newsId);
            res.status(200).json({data: updatedNews, message: "updated"});
        } catch (error) {
            next(error);
        }
    }

    public async deleteNewsById(req: Request, res: Response, next: NextFunction) {
        try {
            const deletedNewsData: News = await this.newsService.deleteNews(
                req.params.id
            );
            res.status(200).json({data: deletedNewsData, message: "deleted"});
        } catch (error) {
            next(error);
        }
    }
}

export default NewsController;
