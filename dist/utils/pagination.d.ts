import { Model, ModelStatic } from "sequelize";
export interface ResultInterface {
    data: Object[];
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
}
declare class PaginationHelper<T extends Model> {
    private model;
    constructor(model: ModelStatic<T>);
    paginate(page: number, pageSize: number): Promise<ResultInterface>;
}
export default PaginationHelper;
