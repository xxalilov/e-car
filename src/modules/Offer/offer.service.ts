import {models} from "../../utils/database";
import PaginationHelper, {ResultInterface} from "../../utils/pagination";
import {isEmpty} from "../../utils/isEpmty";
import {HttpException} from "../../exceptions/HttpException";
import {CreateOfferDto} from "./offer.dto";
import {Offer} from "./offer.interface";

class OfferService {
    public offer = models.Offer;
    public user = models.User;

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
            {model: this.user, as: "user"}
        ]);
    }

    public async createOffer(offerData: CreateOfferDto): Promise<Offer> {
        if(isEmpty(offerData)) throw new HttpException(400, "offerData is Empty");
        const user = await this.user.findByPk(offerData.userId);
        if(!user) throw new HttpException(400, "user not found");
        const offer = await this.offer.create(offerData);
        await user.addOffer(offer.id);
        return offer;
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
