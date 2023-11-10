"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const database_1 = require("../../utils/database");
const pagination_1 = tslib_1.__importDefault(require("../../utils/pagination"));
const isEpmty_1 = require("../../utils/isEpmty");
const HttpException_1 = require("../../exceptions/HttpException");
class ShippingService {
    constructor() {
        this.shipping = database_1.models.Shipping;
    }
    async getAllShipping(page, pageSize) {
        const paginationHelper = new pagination_1.default(this.shipping);
        return await paginationHelper.paginate(page, pageSize, {}, [
            "id",
            "type",
            "price",
        ]);
    }
    async getshippingByType(shippingType) {
        if ((0, isEpmty_1.isEmpty)(shippingType))
            throw new HttpException_1.HttpException(400, "shippingId is empty");
        const shipping = await this.shipping.findOne({
            where: {
                type: shippingType
            }
        });
        if (!shipping)
            throw new HttpException_1.HttpException(400, "shipping not found");
        return shipping;
    }
    async createShipping(shippingData) {
        const findShipping = await this.shipping.findOne({
            where: {
                type: shippingData.type
            }
        });
        if (findShipping)
            throw new HttpException_1.HttpException(400, "Shipping type already existed");
        return await this.shipping.create(shippingData);
    }
    async updateShipping(shippingData, shippingId) {
        const shipping = await this.shipping.findByPk(shippingId);
        if (!shipping)
            throw new HttpException_1.HttpException(400, "shipping not found");
        await shipping.update(shippingData);
        return shipping;
    }
    async deleteShipping(shippingId) {
        const shipping = await this.shipping.findByPk(shippingId);
        if (!shipping)
            throw new HttpException_1.HttpException(400, "shipping not found");
        await shipping.destroy();
        return shipping;
    }
}
exports.default = ShippingService;
//# sourceMappingURL=shipping.service.js.map