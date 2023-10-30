"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const typeOfWorkshop_service_1 = tslib_1.__importDefault(require("./typeOfWorkshop.service"));
class TypeOfWorkshopController {
    constructor() {
        this.typeOfWorkshopService = new typeOfWorkshop_service_1.default();
    }
    async getAllTypeOfWorkshop(req, res, next) {
        try {
            const findAllTypeOfWorkshopsData = await this.typeOfWorkshopService.getAllTypesOfWorkshop(req.query.lang);
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
            if (req.files && Object.keys(req.files).length > 0) {
                const baseDir = path_1.default.join(__dirname, '../../../');
                const timestamp = Date.now();
                let sampleFile = req.files.photo;
                const newFileName = `file_${timestamp}-${sampleFile.name.replace(/\s/g, "")}`;
                const uploadPath = path_1.default.join(baseDir, 'uploads', 'images', newFileName);
                sampleFile.mv(uploadPath, function (err) {
                    if (err)
                        next(err);
                });
                data.photo = `uploads/images/${newFileName}`;
            }
            const newTypeOfWorkshop = await this.typeOfWorkshopService.createTypeOfWorkshop(data);
            res.status(201).json({ data: newTypeOfWorkshop, message: "created" });
        }
        catch (error) {
            next(error);
        }
    }
    async updateTypeOfWorkshop(req, res, next) {
        try {
            const typeOfWorkshopId = req.params.id;
            const data = req.body;
            if (req.files && Object.keys(req.files).length > 0) {
                const baseDir = path_1.default.join(__dirname, '../../../');
                const timestamp = Date.now();
                let sampleFile = req.files.photo;
                const newFileName = `file_${timestamp}-${sampleFile.name.replace(/\s/g, "")}`;
                const uploadPath = path_1.default.join(baseDir, 'uploads', 'images', newFileName);
                sampleFile.mv(uploadPath, function (err) {
                    if (err)
                        next(err);
                });
                data.photo = `uploads/images/${newFileName}`;
            }
            const updatedTypeOfWorkshop = await this.typeOfWorkshopService.updateTypeOfWorkshop(typeOfWorkshopId, data);
            res.status(200).json({ data: updatedTypeOfWorkshop, message: "updated" });
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