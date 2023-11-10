import {NextFunction, Request, Response} from "express";
import ShippingService from "./shipping.service";

class ShippingController {
    private shippingService = new ShippingService();

    public async getAllShippings(req: Request, res: Response, next: NextFunction) {
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 10;
        try {
            const findAllShippingData = await this.shippingService.getAllShipping(page, pageSize);
            res.status(200).json({...findAllShippingData, message: "findAll"});
        } catch (error) {
            next(error);
        }
    }

    public async getShippingByType(req: Request, res: Response, next: NextFunction) {
        try {
            const findOneShippingData = await this.shippingService.getshippingByType(
                req.query.type as string
            );
            res.status(200).json({data: findOneShippingData, message: "findOne"});
        } catch (error) {
            next(error);
        }
    }

    public async createShipping(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const newShipping = await this.shippingService.createShipping(req.body);
            res.status(201).json({data: newShipping, message: "created"});
        } catch (error) {
            next(error);
        }
    }

    public async updateShipping(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const updatedShipping = await this.shippingService.updateShipping(req.body, req.params.id);
            res.status(200).json({data: updatedShipping, message: "updated"});
        } catch (error) {
            next(error);
        }
    }

    public async deleteShippingById(req: Request, res: Response, next: NextFunction) {
        try {
            const deletedShippingData = await this.shippingService.deleteShipping(
                req.params.id
            );
            res.status(200).json({data: deletedShippingData, message: "deleted"});
        } catch (error) {
            next(error);
        }
    }
}

export default ShippingController;
