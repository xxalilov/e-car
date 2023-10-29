import {models} from "../../utils/database";
import PaginationHelper, {ResultInterface} from "../../utils/pagination";
import {isEmpty} from "../../utils/isEpmty";
import {HttpException} from "../../exceptions/HttpException";
import {CreateOfferDto} from "./offer.dto";
import {Offer} from "./offer.interface";

class OfferService {
    public offer = models.Offer;

    public async getAllOffers(
        page: number,
        pageSize: number,
    ): Promise<ResultInterface> {
        const paginationHelper = new PaginationHelper(this.offer);
        return await paginationHelper.paginate(page, pageSize, {}, [
            "id",
            "text",
            "userId",
            "createdAt",
        ]);
    }

    public async createOffer(offerData: CreateOfferDto): Promise<Offer> {
        if(isEmpty(offerData)) throw new HttpException(400, "offerData is Empty");
        return await this.offer.create(offerData);
    }

    public async deleteOffer(offerId: string): Promise<Offer> {
        if(isEmpty(offerId)) throw new HttpException(400, "Please input offerId")
        const offer = await this.offer.findByPk(offerId);
        if (!offer) throw new HttpException(400, "offer not found");
        await offer.destroy();
        return offer;
    }
}

export default OfferService;
