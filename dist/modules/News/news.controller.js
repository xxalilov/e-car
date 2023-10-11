"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const news_service_1 = tslib_1.__importDefault(require("./news.service"));
class NewsController {
    constructor() {
        this.newsService = new news_service_1.default();
    }
    async getAllNews(req, res, next) {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        try {
            const findAllNewsData = await this.newsService.getAllNews(page, pageSize);
            res.status(200).json(Object.assign(Object.assign({}, findAllNewsData), { message: "findAll" }));
        }
        catch (error) {
            next(error);
        }
    }
    async getNewsById(req, res, next) {
        try {
            const findOneNewsData = await this.newsService.getNewsById(req.params.id);
            res.status(200).json({ data: findOneNewsData, message: "findOne" });
        }
        catch (error) {
            next(error);
        }
    }
    async createNews(req, res, next) {
        try {
            const newsData = req.body;
            if (req.files && req.files.photo) {
                const photo = req.files.photo;
                newsData.image = photo[0].path;
            }
            const newNews = await this.newsService.createNews(newsData);
            res.status(201).json({ data: newNews, message: "created" });
        }
        catch (error) {
            next(error);
        }
    }
    async updateNews(req, res, next) {
        try {
            const newsData = req.body;
            const newsId = req.params.id;
            const photo = req.files.photo;
            if (photo) {
                newsData.photo = photo[0].path;
            }
            const updatedNews = await this.newsService.updateNews(newsData, newsId);
            res.status(200).json({ data: updatedNews, message: "updated" });
        }
        catch (error) {
            next(error);
        }
    }
    async deleteNewsById(req, res, next) {
        try {
            const deletedNewsData = await this.newsService.deleteNews(req.params.id);
            res.status(200).json({ data: deletedNewsData, message: "deleted" });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = NewsController;
//# sourceMappingURL=news.controller.js.map