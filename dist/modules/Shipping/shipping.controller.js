"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const shipping_service_1 = tslib_1.__importDefault(require("./shipping.service"));
class ShippingController {
    constructor() {
        this.shippingService = new shipping_service_1.default();
    }
    async getAllShippings(req, res, next) {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        try {
            const findAllShippingData = await this.shippingService.getAllShipping(page, pageSize);
            res.status(200).json(Object.assign(Object.assign({}, findAllShippingData), { message: "findAll" }));
        }
        catch (error) {
            next(error);
        }
    }
    async getShippingByType(req, res, next) {
        try {
            const findOneShippingData = await this.shippingService.getshippingByType(req.query.type);
            res.status(200).json({ data: findOneShippingData, message: "findOne" });
        }
        catch (error) {
            next(error);
        }
    }
    async createShipping(req, res, next) {
        try {
            const newShipping = await this.shippingService.createShipping(req.body);
            res.status(201).json({ data: newShipping, message: "created" });
        }
        catch (error) {
            next(error);
        }
    }
    async updateShipping(req, res, next) {
        try {
            const updatedShipping = await this.shippingService.updateShipping(req.body, req.params.id);
            res.status(200).json({ data: updatedShipping, message: "updated" });
        }
        catch (error) {
            next(error);
        }
    }
    async deleteShippingById(req, res, next) {
        try {
            const deletedShippingData = await this.shippingService.deleteShipping(req.params.id);
            res.status(200).json({ data: deletedShippingData, message: "deleted" });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = ShippingController;
//# sourceMappingURL=shipping.controller.js.map