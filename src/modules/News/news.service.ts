import {models} from "../../utils/database";
import PaginationHelper, {ResultInterface} from "../../utils/pagination";
import {isEmpty} from "../../utils/isEpmty";
import {HttpException} from "../../exceptions/HttpException";
import {deleteFile} from "../../utils/file";
import {News} from "./news.interface";
import {CreateNewsDto, UpdateNewsDto} from "./news.dto";
import {Sequelize} from "sequelize";

class NewsService {
    public news = models.News;

    public async getAllNews(
        page: number,
        pageSize: number,
        lang: string
    ): Promise<ResultInterface> {
        const paginationHelper = new PaginationHelper(this.news);
        if(lang ==="all") {
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
            [Sequelize.literal(`COALESCE("title_${lang}")`), 'title'],
            [Sequelize.literal(`COALESCE("description_${lang}")`), 'description'],
            "link",
            "image",
            "createdAt",
        ]);
    }

    public async getNewsById(newsId: string, lang: string): Promise<News> {
        if (isEmpty(newsId)) throw new HttpException(400, "newsId is empty");
        const news: News = await this.news.findByPk(newsId, {
            attributes: [
                "id",
                [Sequelize.literal(`COALESCE("title_${lang}")`), 'title'],
                [Sequelize.literal(`COALESCE("description_${lang}")`), 'description'],
                "link",
                "image",
                "createdAt",
            ]
        });
        if (!news) throw new HttpException(400, "News not found");
        return news;
    }

    public async createNews(newsData: CreateNewsDto): Promise<News> {
        return await this.news.create(newsData);
    }

    public async updateNews(newsData: UpdateNewsDto, newsId: string): Promise<News> {
        const news = await this.news.findByPk(newsId);
        if (!news) throw new HttpException(400, "News not found");
        if (newsData.image && news.image) deleteFile(news.image);
        await news.update(newsData);
        return news;
    }

    public async deleteNews(newsId: string): Promise<News> {
        const news = await this.news.findByPk(newsId);
        if (!news) throw new HttpException(400, "News not found");
        if (news.image) deleteFile(news.image);
        await news.destroy();
        return news;
    }
}

export default NewsService;
