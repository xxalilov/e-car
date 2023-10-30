"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const offer_service_1 = tslib_1.__importDefault(require("./offer.service"));
class OfferController {
    constructor() {
        this.offerService = new offer_service_1.default();
    }
    async getAllOffers(req, res, next) {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        try {
            const findAllOfferData = await this.offerService.getAllOffers(page, pageSize);
            res.status(200).json(Object.assign(Object.assign({}, findAllOfferData), { message: "findAll" }));
        }
        catch (error) {
            next(error);
        }
    }
    async createOffer(req, res, next) {
        try {
            const offerData = req.body;
            offerData.userId = req.user.id;
            const newOffer = await this.offerService.createOffer(offerData);
            res.status(201).json({ data: newOffer, message: "created" });
        }
        catch (error) {
            next(error);
        }
    }
    async deleteOfferById(req, res, next) {
        try {
            const deletedOfferData = await this.offerService.deleteOffer(req.params.id);
            res.status(200).json({ data: deletedOfferData, message: "deleted" });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = OfferController;
//# sourceMappingURL=offer.controller.js.map