import { Model, Optional, Sequelize } from "sequelize";
import { Offer } from "./offer.interface";
export type OfferCreationAttributes = Optional<Offer, "id" | "text" | "userId">;
export declare class OfferModel extends Model<Offer, OfferCreationAttributes> implements Offer {
    id: number;
    text: string;
    userId: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default function (sequelize: Sequelize): typeof OfferModel;
