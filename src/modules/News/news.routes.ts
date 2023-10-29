import {Router} from "express";
import {Routes} from "../../routes/route.interface";
import authMiddleware from "../../middlewares/auth.middleware";
import NewsController from "./news.controller";
import LanguageMiddleware from "../../middlewares/language.middleware";

class NewsRouter implements Routes {
    public path = "/news";
    public router = Router();
    public newsController = new NewsController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            `${this.path}`,
            authMiddleware("admin"),
            this.newsController.createNews.bind(this.newsController)
        );
        this.router.put(
            `${this.path}/:id`,
            authMiddleware("admin"),
            this.newsController.updateNews.bind(this.newsController)
        );
        this.router.get(
            `${this.path}`,
            authMiddleware("all"),
            LanguageMiddleware,
            this.newsController.getAllNews.bind(this.newsController)
        );
        this.router.get(
            `${this.path}/:id`,
            authMiddleware("all"),
            LanguageMiddleware,
            this.newsController.getNewsById.bind(this.newsController)
        );

        this.router.delete(
            `${this.path}/:id`,
            authMiddleware("admin"),
            this.newsController.deleteNewsById.bind(this.newsController)
        );
    }
}

export default NewsRouter;
