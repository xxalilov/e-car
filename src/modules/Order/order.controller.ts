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
