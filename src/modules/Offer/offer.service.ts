// import {models} from "../../utils/database";
// import PaginationHelper, {ResultInterface} from "../../utils/pagination";
// import {isEmpty} from "../../utils/isEpmty";
// import {HttpException} from "../../exceptions/HttpException";
// import {deleteFile} from "../../utils/file";
// import {offer} from "./offer.interface";
// import {CreateofferDto, UpdateofferDto} from "./offer.dto";
// import {Sequelize} from "sequelize";
//
// class OfferService {
//     public offer = models.offer;
//
//     public async getAlloffer(
//         page: number,
//         pageSize: number,
//         lang: string
//     ): Promise<ResultInterface> {
//         const paginationHelper = new PaginationHelper(this.offer);
//         return await paginationHelper.paginate(page, pageSize, {}, [
//             "id",
//             [Sequelize.literal(`COALESCE("title_${lang}")`), 'title'],
//             [Sequelize.literal(`COALESCE("description_${lang}")`), 'description'],
//             "link",
//             "image",
//             "createdAt",
//         ]);
//     }
//
//     public async getofferById(offerId: string, lang: string): Promise<offer> {
//         if (isEmpty(offerId)) throw new HttpException(400, "offerId is empty");
//         const offer: offer = await this.offer.findByPk(offerId, {
//             attributes: [
//                 "id",
//                 [Sequelize.literal(`COALESCE("title_${lang}")`), 'title'],
//                 [Sequelize.literal(`COALESCE("description_${lang}")`), 'description'],
//                 "link",
//                 "image",
//                 "createdAt",
//             ]
//         });
//         if (!offer) throw new HttpException(400, "offer not found");
//         return offer;
//     }
//
//     public async createoffer(offerData: CreateofferDto): Promise<offer> {
//         return await this.offer.create(offerData);
//     }
//
//     public async updateoffer(offerData: UpdateofferDto, offerId: string): Promise<offer> {
//         const offer = await this.offer.findByPk(offerId);
//         if (!offer) throw new HttpException(400, "offer not found");
//         if (offerData.image && offer.image) deleteFile(offer.image);
//         await offer.update(offerData);
//         return offer;
//     }
//
//     public async deleteoffer(offerId: string): Promise<offer> {
//         const offer = await this.offer.findByPk(offerId);
//         if (!offer) throw new HttpException(400, "offer not found");
//         if (offer.image) deleteFile(offer.image);
//         await offer.destroy();
//         return offer;
//     }
// }
//
// export default OfferService;
