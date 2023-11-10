import {models} from "../../utils/database";
import PaginationHelper, {ResultInterface} from "../../utils/pagination";
import {isEmpty} from "../../utils/isEpmty";
import {HttpException} from "../../exceptions/HttpException";
import {Shipping} from "./shipping.interface";
import {CreateShippingDto, UpdateShippingDto} from "./shipping.dto";

class ShippingService {
    public shipping = models.Shipping;

    public async getAllShipping(
        page: number,
        pageSize: number,
    ): Promise<ResultInterface> {
        const paginationHelper = new PaginationHelper(this.shipping);
        return await paginationHelper.paginate(page, pageSize, {}, [
            "id",
            "type",
            "price",
        ]);
    }

    public async getshippingByType(shippingType: string): Promise<Shipping> {
        if (isEmpty(shippingType)) throw new HttpException(400, "shippingId is empty");
        const shipping: Shipping = await this.shipping.findOne( {
            where: {
                type: shippingType}
        });


        if (!shipping) throw new HttpException(400, "shipping not found");
        return shipping;
    }

    public async createShipping(shippingData: CreateShippingDto): Promise<Shipping> {
        const findShipping = await this.shipping.findOne({
            where: {
                type: shippingData.type
            }
        })

        if(findShipping) throw new HttpException(400, "Shipping type already existed")

        return await this.shipping.create(shippingData);
    }

    public async updateShipping(shippingData: UpdateShippingDto, shippingId: string): Promise<Shipping> {
        const shipping = await this.shipping.findByPk(shippingId);
        if (!shipping) throw new HttpException(400, "shipping not found");
        await shipping.update(shippingData);
        return shipping;
    }

    public async deleteShipping(shippingId: string): Promise<Shipping> {
        const shipping = await this.shipping.findByPk(shippingId);
        if (!shipping) throw new HttpException(400, "shipping not found");
        await shipping.destroy();
        return shipping;
    }
}

export default ShippingService;
