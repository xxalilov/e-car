"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const auth_middleware_1 = tslib_1.__importDefault(require("../../middlewares/auth.middleware"));
const receipt_controller_1 = tslib_1.__importDefault(require("./receipt.controller"));
class ReceiptRouter {
    constructor() {
        this.path = "/receipt";
        this.router = (0, express_1.Router)();
        this.receiptController = new receipt_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/add-card`, (0, auth_middleware_1.default)('user'), this.receiptController.createCard.bind(this.receiptController));
        this.router.post(`${this.path}/verify-confirmation`, (0, auth_middleware_1.default)('user'), this.receiptController.verifyConfirmation.bind(this.receiptController));
        this.router.get(`${this.path}/check-card`, (0, auth_middleware_1.default)('user'), this.receiptController.checkCard.bind(this.receiptController));
        this.router.post(`${this.path}/create-receipt`, (0, auth_middleware_1.default)('user'), this.receiptController.createReceipt.bind(this.receiptController));
        this.router.post(`${this.path}/pay-receipt`, (0, auth_middleware_1.default)('user'), this.receiptController.payReceipt.bind(this.receiptController));
    }
}
exports.default = ReceiptRouter;
//# sourceMappingURL=receipt.routes.js.map