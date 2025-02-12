"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const database_1 = require("../../utils/database");
const pagination_1 = tslib_1.__importDefault(require("../../utils/pagination"));
const isEpmty_1 = require("../../utils/isEpmty");
const HttpException_1 = require("../../exceptions/HttpException");
const file_1 = require("../../utils/file");
const sequelize_1 = require("sequelize");
class NewsService {
    constructor() {
        this.news = database_1.models.News;
    }
    async getAllNews(page, pageSize, lang) {
        const paginationHelper = new pagination_1.default(this.news);
        if (lang === "all") {
            return await paginationHelper.paginate(page, pageSize, {}, [
                "id",
                "title_uz",
                "title_ru",
                "title_eng",
                "description_uz",
                "description_ru",
                "description_eng",
                "link",
                "image",
                "createdAt",
            ]);
        }
        return await paginationHelper.paginate(page, pageSize, {}, [
            "id",
            [sequelize_1.Sequelize.literal(`COALESCE("title_${lang}")`), 'title'],
            [sequelize_1.Sequelize.literal(`COALESCE("description_${lang}")`), 'description'],
            "link",
            "image",
            "createdAt",
        ]);
    }
    async getNewsById(newsId, lang) {
        if ((0, isEpmty_1.isEmpty)(newsId))
            throw new HttpException_1.HttpException(400, "newsId is empty");
        const news = await this.news.findByPk(newsId, {
            attributes: [
                "id",
                [sequelize_1.Sequelize.literal(`COALESCE("title_${lang}")`), 'title'],
                [sequelize_1.Sequelize.literal(`COALESCE("description_${lang}")`), 'description'],
                "link",
                "image",
                "createdAt",
            ]
        });
        if (!news)
            throw new HttpException_1.HttpException(400, "News not found");
        return news;
    }
    async createNews(newsData) {
        return await this.news.create(newsData);
    }
    async updateNews(newsData, newsId) {
        const news = await this.news.findByPk(newsId);
        if (!news)
            throw new HttpException_1.HttpException(400, "News not found");
        if (newsData.image && news.image)
            (0, file_1.deleteFile)(news.image);
        await news.update(newsData);
        return news;
    }
    async deleteNews(newsId) {
        const news = await this.news.findByPk(newsId);
        if (!news)
            throw new HttpException_1.HttpException(400, "News not found");
        if (news.image)
            (0, file_1.deleteFile)(news.image);
        await news.destroy();
        return news;
    }
}
exports.default = NewsService;
//# sourceMappingURL=news.service.js.map