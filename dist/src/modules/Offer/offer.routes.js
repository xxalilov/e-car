"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const auth_middleware_1 = tslib_1.__importDefault(require("../../middlewares/auth.middleware"));
const offer_controller_1 = tslib_1.__importDefault(require("./offer.controller"));
class OfferRouter {
    constructor() {
        this.path = "/offers";
        this.router = (0, express_1.Router)();
        this.offerController = new offer_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, (0, auth_middleware_1.default)("user"), this.offerController.createOffer.bind(this.offerController));
        this.router.get(`${this.path}`, (0, auth_middleware_1.default)("admin"), this.offerController.getAllOffers.bind(this.offerController));
        this.router.delete(`${this.path}/:id`, (0, auth_middleware_1.default)("admin"), this.offerController.deleteOfferById.bind(this.offerController));
    }
}
exports.default = OfferRouter;
//# sourceMappingURL=offer.routes.js.map