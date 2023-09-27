"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PaginationHelper {
    constructor(model) {
        this.model = model;
    }
    async paginate(page, pageSize, whereOption) {
        const offset = (page - 1) * pageSize;
        const options = {
            limit: pageSize,
            offset,
            where: whereOption,
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
exports.default = PaginationHelper;
//# sourceMappingURL=pagination.js.map