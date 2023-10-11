"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const receipt_service_1 = tslib_1.__importDefault(require("./receipt.service"));
class ReceiptController {
    constructor() {
        this.receiptService = new receipt_service_1.default();
    }
    async createCard(req, res, next) {
        const userId = req.user.id.toString();
        try {
            const response = await this.receiptService.addCard(parseInt(userId), req.body.card_number, req.body.card_expire);
            res.status(200).json({
                data: response,
                message: "Send code"
            });
        }
        catch (error) {
            next(error);
        }
    }
    async verifyConfirmation(req, res, next) {
        const userId = req.user.id.toString();
        try {
            const response = await this.receiptService.verifyCode(userId, req.body.code);
            res.status(200).json({
                data: response,
                message: "Verify Code"
            });
        }
        catch (error) {
            next(error);
        }
    }
    async checkCard(req, res, next) {
        const userId = req.user.id.toString();
        try {
            const response = this.receiptService.checkCard(userId);
            res.status(200).json({});
        }
        catch (error) {
            next(error);
        }
    }
    async createReceipt(req, res, next) {
        const userId = req.user.id.toString();
        try {
            const response = this.receiptService.createReceipt(userId, req.body.shippingAddress);
            res.status(201).json({});
        }
        catch (error) {
            next(error);
        }
    }
    async payReceipt(req, res, next) {
        const userId = req.user.id.toString();
        try {
            const response = this.receiptService.payReceipts(userId, req.body.receiptId);
            res.status(200).json({});
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = ReceiptController;
//# sourceMappingURL=receipt.controller.js.map