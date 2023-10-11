import { ResultInterface } from "../../utils/pagination";
import { News } from "./news.interface";
import { CreateNewsDto, UpdateNewsDto } from "./news.dto";
declare class NewsService {
    news: typeof import("./news.model").NewsModel;
    getAllNews(page: number, pageSize: number): Promise<ResultInterface>;
    getNewsById(newsId: string): Promise<News>;
    createNews(newsData: CreateNewsDto): Promise<News>;
    updateNews(newsData: UpdateNewsDto, newsId: string): Promise<News>;
    deleteNews(newsId: string): Promise<News>;
}
export default NewsService;
