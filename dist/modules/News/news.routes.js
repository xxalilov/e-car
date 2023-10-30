"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const auth_middleware_1 = tslib_1.__importDefault(require("../../middlewares/auth.middleware"));
const news_controller_1 = tslib_1.__importDefault(require("./news.controller"));
const language_middleware_1 = tslib_1.__importDefault(require("../../middlewares/language.middleware"));
class NewsRouter {
    constructor() {
        this.path = "/news";
        this.router = (0, express_1.Router)();
        this.newsController = new news_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, (0, auth_middleware_1.default)("admin"), this.newsController.createNews.bind(this.newsController));
        this.router.put(`${this.path}/:id`, (0, auth_middleware_1.default)("admin"), this.newsController.updateNews.bind(this.newsController));
        this.router.get(`${this.path}`, (0, auth_middleware_1.default)("all"), language_middleware_1.default, this.newsController.getAllNews.bind(this.newsController));
        this.router.get(`${this.path}/:id`, (0, auth_middleware_1.default)("all"), language_middleware_1.default, this.newsController.getNewsById.bind(this.newsController));
        this.router.delete(`${this.path}/:id`, (0, auth_middleware_1.default)("admin"), this.newsController.deleteNewsById.bind(this.newsController));
    }
}
exports.default = NewsRouter;
//# sourceMappingURL=news.routes.js.map