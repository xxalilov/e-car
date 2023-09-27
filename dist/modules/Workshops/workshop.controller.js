"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const workshop_service_1 = tslib_1.__importDefault(require("./workshop.service"));
class WorkshopController {
    constructor() {
        this.workshopService = new workshop_service_1.default();
    }
    async getAllWorkshops(req, res, next) {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        try {
            const findAllWorkshopData = await this.workshopService.getAllWorkshops(page, pageSize);
            res.status(200).json(Object.assign(Object.assign({}, findAllWorkshopData), { message: "findAll" }));
        }
        catch (error) {
            next(error);
        }
    }
    async getAllWorkshopsByType(req, res, next) {
        const typeOfWorkshopId = req.params.id;
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        try {
            const findAllWorkshopData = await this.workshopService.getAllWorkshopsByType(page, pageSize, typeOfWorkshopId);
            res.status(200).json(Object.assign(Object.assign({}, findAllWorkshopData), { message: "findAll" }));
        }
        catch (error) {
            next(error);
        }
    }
    async createWorkshop(req, res, next) {
        try {
            const workshopData = req.body;
            const newWorkshop = await this.workshopService.createWorkshop(workshopData);
            res.status(201).json({ data: newWorkshop, message: "created" });
        }
        catch (error) {
            next(error);
        }
    }
    async updateWorkshop(req, res, next) {
        try {
            const workshopData = req.body;
            const workshopId = req.params.id;
            const updatedWorkshop = await this.workshopService.updateWorkshop(workshopData, workshopId);
            res.status(200).json({ data: updatedWorkshop, message: "updated" });
        }
        catch (error) {
            next(error);
        }
    }
    async deleteWorkshop(req, res, next) {
        try {
            const workshopId = req.params.id;
            const deletedWorkshop = await this.workshopService.deleteWorkshop(workshopId);
            res.status(200).json({ data: deletedWorkshop, message: "deleted" });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = WorkshopController;
//# sourceMappingURL=workshop.controller.js.map