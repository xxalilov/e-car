"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeOfWorkshop_service_1 = tslib_1.__importDefault(require("./typeOfWorkshop.service"));
class TypeOfWorkshopController {
    constructor() {
        this.typeOfWorkshopService = new typeOfWorkshop_service_1.default();
    }
    async getAllTypeOfWorkshop(req, res, next) {
        try {
            const findAllTypeOfWorkshopsData = await this.typeOfWorkshopService.getAllTypesOfWorkshop();
            res
                .status(200)
                .json({ data: findAllTypeOfWorkshopsData, message: "findAll" });
        }
        catch (error) {
            next(error);
        }
    }
    async createTypeOfWorkshop(req, res, next) {
        try {
            const data = req.body;
            if (req.files && req.files.photo) {
                const photo = req.files.photo;
                if (photo) {
                    data.photo = photo[0].path;
                }
            }
            const newTypeOfWorkshop = await this.typeOfWorkshopService.createTypeOfWorkshop(data);
            res.status(201).json({ data: newTypeOfWorkshop, message: "created" });
        }
        catch (error) {
            next(error);
        }
    }
    async deleteTypeOfWorkshop(req, res, next) {
        try {
            const typeOfWorkshopId = req.params.id;
            const deletedTypeOfWorkshop = await this.typeOfWorkshopService.deleteTypeOfWorkshop(typeOfWorkshopId);
            res.status(200).json({ data: deletedTypeOfWorkshop, message: "deleted" });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = TypeOfWorkshopController;
//# sourceMappingURL=typeOfWorkshop.controller.js.map