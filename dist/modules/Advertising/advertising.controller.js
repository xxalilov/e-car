"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
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
            if (req.files && req.files.photo) {
                const photo = req.files.photo;
                advertisingData.photo = photo[0].path;
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