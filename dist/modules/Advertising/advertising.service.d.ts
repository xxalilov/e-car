import { Advertising } from "./advertising.interface";
import { CreateAdvertisingDto } from "./advertising.dto";
declare class AdvertisingService {
    advertising: typeof import("./advertising.model").AdvertisingModel;
    getAllAdvertisings(): Promise<Advertising[]>;
    createAdvertising(advertisingData: CreateAdvertisingDto): Promise<Advertising>;
    deleteAdvertising(advertisingId: string): Promise<Advertising>;
}
export default AdvertisingService;
