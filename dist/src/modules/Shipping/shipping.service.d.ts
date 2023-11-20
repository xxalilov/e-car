import { ResultInterface } from "../../utils/pagination";
import { Shipping } from "./shipping.interface";
import { CreateShippingDto, UpdateShippingDto } from "./shipping.dto";
declare class ShippingService {
    shipping: typeof import("./shipping.model").ShippingModel;
    getAllShipping(page: number, pageSize: number): Promise<ResultInterface>;
    getshippingByType(shippingType: string): Promise<Shipping>;
    createShipping(shippingData: CreateShippingDto): Promise<Shipping>;
    updateShipping(shippingData: UpdateShippingDto, shippingId: string): Promise<Shipping>;
    deleteShipping(shippingId: string): Promise<Shipping>;
}
export default ShippingService;
