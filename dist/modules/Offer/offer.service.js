"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const database_1 = require("../../utils/database");
const pagination_1 = tslib_1.__importDefault(require("../../utils/pagination"));
const isEpmty_1 = require("../../utils/isEpmty");
const HttpException_1 = require("../../exceptions/HttpException");
class OfferService {
    constructor() {
        this.offer = database_1.models.Offer;
    }
    async getAllOffers(page, pageSize) {
        const paginationHelper = new pagination_1.default(this.offer);
        return await paginationHelper.paginate(page, pageSize, {}, [
            "id",
            "text",
            "userId",
            "createdAt",
        ]);
    }
    async createOffer(offerData) {
        if ((0, isEpmty_1.isEmpty)(offerData))
            throw new HttpException_1.HttpException(400, "offerData is Empty");
        return await this.offer.create(offerData);
    }
    async deleteOffer(offerId) {
        if ((0, isEpmty_1.isEmpty)(offerId))
            throw new HttpException_1.HttpException(400, "Please input offerId");
        const offer = await this.offer.findByPk(offerId);
        if (!offer)
            throw new HttpException_1.HttpException(400, "offer not found");
        await offer.destroy();
        return offer;
    }
}
exports.default = OfferService;
//# sourceMappingURL=offer.service.js.map