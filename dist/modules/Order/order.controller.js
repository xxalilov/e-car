"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const order_service_1 = tslib_1.__importDefault(require("./order.service"));
class orderController {
    constructor() {
        this.orderService = new order_service_1.default();
        // public async removeProduct(
        //     req: RequestWithUser,
        //     res: Response,
        //     next: NextFunction
        // ) {
        //     try {
        //         const productId = req.body.productId;
        //         const userId = req.user.id;
        //         const removedProduct = await this.orderService.removeProduct(
        //             productId,
        //             userId.toString()
        //         );
        //         res.status(200).json({data: removedProduct, message: "removed"});
        //     } catch (error) {
        //         next(error);
        //     }
        // }
    }
    async getUserOrders(req, res, next) {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        try {
            const userId = req.user.id;
            const order = await this.orderService.getUserOrders(page, pageSize, userId.toString(), req.query.type.toString());
            res.status(200).json(Object.assign(Object.assign({}, order), { message: "get" }));
        }
        catch (error) {
            next(error);
        }
    }
    async createOrder(req, res, next) {
        try {
            const userId = req.user.id.toString();
            const createdOrder = await this.orderService.createOrder(req.body, userId);
            res.status(200).json({ data: createdOrder, message: "added" });
        }
        catch (error) {
            next(error);
        }
    }
    async payOrder(req, res, next) {
        try {
            const order = await this.orderService.payOrder(req.user.id, req.body.card_number, req.body.card_expire);
            res.status(200).json({ data: order, message: "send code" });
        }
        catch (error) {
            next(error);
        }
    }
    async verifyCode(req, res, next) {
        try {
            const order = await this.orderService.confirmPayOrder(req.body.orderId, req.user.id, req.body.token, req.body.code);
            res.status(200).json({ data: order, message: "verified" });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = orderController;
//# sourceMappingURL=order.controller.js.map