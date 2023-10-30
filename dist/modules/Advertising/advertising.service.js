"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../utils/database");
const isEpmty_1 = require("../../utils/isEpmty");
const HttpException_1 = require("../../exceptions/HttpException");
const file_1 = require("../../utils/file");
class AdvertisingService {
    constructor() {
        this.advertising = database_1.models.Advertising;
    }
    async getAllAdvertisings() {
        const advertisings = await this.advertising.findAll();
        return advertisings;
    }
    async createAdvertising(advertisingData) {
        if (!advertisingData.photo)
            throw new HttpException_1.HttpException(400, "Please input photo");
        const advertising = await this.advertising.create(advertisingData);
        return advertising;
    }
    async deleteAdvertising(advertisingId) {
        if ((0, isEpmty_1.isEmpty)(advertisingId))
            throw new HttpException_1.HttpException(400, "Please input id");
        const advertising = await this.advertising.findByPk(advertisingId);
        if (!advertising)
            throw new HttpException_1.HttpException(400, "Advertising not found");
        if (advertising.photo)
            (0, file_1.deleteFile)(advertising.photo);
        await advertising.destroy();
        return advertising;
    }
}
exports.default = AdvertisingService;
//# sourceMappingURL=advertising.service.js.map