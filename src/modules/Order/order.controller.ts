import {NextFunction, Request, Response} from "express";
import {RequestWithUser} from "../../modules/Auth/auth.interface";
import OrderService from "./order.service";

class orderController {
    private orderService = new OrderService();

    public async getUserOrders(
        req: RequestWithUser,
        res: Response,
        next: NextFunction
    ) {
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 10;
        try {
            const userId = req.user.id;
            const order = await this.orderService.getUserOrders(page, pageSize, userId.toString(), req.query.type.toString());
            res.status(200).json({...order, message: "get"});
        } catch (error) {
            next(error);
        }
    }

    public async createOrder(
        req: RequestWithUser,
        res: Response,
        next: NextFunction
    ) {
        try {
            const userId = req.user.id.toString();
            const createdOrder = await this.orderService.createOrder(
                req.body,
                userId,
            );
            res.status(200).json({data: createdOrder, message: "added"});
        } catch (error) {
            next(error);
        }
    }

    public async payOrder(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const order = await this.orderService.payOrder(req.user.id, req.body.card_number, req.body.card_expire);
            res.status(200).json({data: order, message: "send code"});
        } catch (error) {
            next(error);
        }
    }

    public async verifyCode(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const order = await this.orderService.confirmPayOrder(req.body.orderId, req.user.id, req.body.token, req.body.code);
            res.status(200).json({data: order, message: "verified"});
        } catch (error) {
            next(error);
        }
    }

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

export default orderController;
