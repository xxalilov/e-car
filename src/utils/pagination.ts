import {Model, FindOptions, ModelStatic} from "sequelize";

export interface ResultInterface {
    data: Object[];
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
}

class PaginationHelper<T extends Model> {
    private model: ModelStatic<T>;

    constructor(model: ModelStatic<T>) {
        this.model = model;
    }

    async paginate(
        page: number,
        pageSize: number,
        whereOption?: {},
        attributesOptions?: any[],
        orderOption?: any[],
        includeOption?: any[]
    ): Promise<ResultInterface> {
        const offset = (page - 1) * pageSize;
        const options: FindOptions = {
            limit: pageSize,
            offset,
            where: whereOption,
            attributes: attributesOptions,
            order: orderOption,
            include: includeOption
        };
        const results = await this.model.findAndCountAll(options);

        const totalPages = Math.ceil(results.count / pageSize);

        return {
            data: results.rows,
            page,
            pageSize,
            totalCount: results.count,
            totalPages,
        };
    }
}

export default PaginationHelper;
