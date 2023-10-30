import { ResultInterface } from "../../utils/pagination";
import { CreateOfferDto } from "./offer.dto";
import { Offer } from "./offer.interface";
declare class OfferService {
    offer: typeof import("./offer.model").OfferModel;
    getAllOffers(page: number, pageSize: number): Promise<ResultInterface>;
    createOffer(offerData: CreateOfferDto): Promise<Offer>;
    deleteOffer(offerId: string): Promise<Offer>;
}
export default OfferService;
