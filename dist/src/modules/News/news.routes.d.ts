import { Routes } from "../../routes/route.interface";
import NewsController from "./news.controller";
declare class NewsRouter implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    newsController: NewsController;
    constructor();
    private initializeRoutes;
}
export default NewsRouter;
