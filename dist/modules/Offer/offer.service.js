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
        this.user = database_1.models.User;
    }
    async getAllOffers(page, pageSize) {
        const paginationHelper = new pagination_1.default(this.offer);
        return await paginationHelper.paginate(page, pageSize, {}, [
            "id",
            "text",
            "userId",
            "createdAt",
        ], [], [{ model: this.user, as: "user" }]);
    }
    async createOffer(offerData) {
        if ((0, isEpmty_1.isEmpty)(offerData))
            throw new HttpException_1.HttpException(400, "offerData is Empty");
        const user = await this.user.findByPk(offerData.userId);
        if (!user)
            throw new HttpException_1.HttpException(400, "user not found");
        const offer = await this.offer.create(offerData);
        await user.addOffer(offer.id);
        return offer;
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