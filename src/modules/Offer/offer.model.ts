import {DataTypes, Model, Optional, Sequelize} from "sequelize";
import {Offer} from "./offer.interface";

export type OfferCreationAttributes = Optional<
    Offer,
    "id" | "text" | "userId"
>;

export class OfferModel extends Model<Offer, OfferCreationAttributes> implements Offer {
    public id: number;
    public text: string;
    public userId: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof OfferModel {
    OfferModel.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.BIGINT,
                autoIncrement: true
            },
            text: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            userId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: "offers",
            sequelize,
        }
    );

    return OfferModel;
}
