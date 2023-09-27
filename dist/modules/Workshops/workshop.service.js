"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const database_1 = require("../../utils/database");
const pagination_1 = tslib_1.__importDefault(require("../../utils/pagination"));
const isEpmty_1 = require("../../utils/isEpmty");
const HttpException_1 = require("../../exceptions/HttpException");
class WorkshopService {
    constructor() {
        this.workshop = database_1.models.Workshop;
        this.typeOfWorkshop = database_1.models.TypeOfWorkshop;
    }
    async getAllWorkshops(page, pageSize) {
        const paginationHelper = new pagination_1.default(this.workshop);
        const result = await paginationHelper.paginate(page, pageSize);
        return result;
    }
    async getAllWorkshopsByType(page, pageSize, typeOfWorkshopId) {
        const paginationHelper = new pagination_1.default(this.workshop);
        const result = await paginationHelper.paginate(page, pageSize, {
            typeOfWorkshopId,
        });
        return result;
        // const workshops = await this.workshop.findAll({
        //   where: { typeOfWorkshopId },
        // });
        // return workshops;
    }
    async createWorkshop(workshopData) {
        const typeOfWorkshop = await this.typeOfWorkshop.findByPk(workshopData.typeOfWorkshopId);
        if (!typeOfWorkshop)
            throw new HttpException_1.HttpException(400, "Type not found");
        const workshop = await this.workshop.create(workshopData);
        return workshop;
    }
    async updateWorkshop(workshopData, workshopId) {
        if ((0, isEpmty_1.isEmpty)(workshopId))
            throw new HttpException_1.HttpException(400, "please input id");
        const workshop = await this.workshop.findByPk(workshopId);
        if (!workshop)
            throw new HttpException_1.HttpException(400, "Car not found");
        await workshop.update(workshopData);
        return workshop;
    }
    async deleteWorkshop(workshopId) {
        if ((0, isEpmty_1.isEmpty)(workshopId))
            throw new HttpException_1.HttpException(400, "please input id");
        const workshop = await this.workshop.findByPk(workshopId);
        if (!workshop)
            throw new HttpException_1.HttpException(400, "Car not found");
        await workshop.destroy();
        return workshop;
    }
}
exports.default = WorkshopService;
//# sourceMappingURL=workshop.service.js.map