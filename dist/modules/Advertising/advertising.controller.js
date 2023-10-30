"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const advertising_service_1 = tslib_1.__importDefault(require("./advertising.service"));
class AdvertisingController {
    constructor() {
        this.advertisingService = new advertising_service_1.default();
    }
    async getAllAdvertisings(req, res, next) {
        try {
            const findAllCarsData = await this.advertisingService.getAllAdvertisings();
            res.status(200).json({ data: findAllCarsData, message: "findAll" });
        }
        catch (error) {
            next(error);
        }
    }
    async createAdvertising(req, res, next) {
        try {
            const advertisingData = req.body;
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
                advertisingData.photo = `uploads/images/${newFileName}`;
            }
            const newAdvertising = await this.advertisingService.createAdvertising(advertisingData);
            res.status(201).json({ data: newAdvertising, message: "created" });
        }
        catch (error) {
            next(error);
        }
    }
    async deleteAdvertising(req, res, next) {
        try {
            const advertisingId = req.params.id;
            const deletedAdvertising = await this.advertisingService.deleteAdvertising(advertisingId);
            res.status(200).json({ data: deletedAdvertising, message: "deleted" });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = AdvertisingController;
//# sourceMappingURL=advertising.controller.js.map