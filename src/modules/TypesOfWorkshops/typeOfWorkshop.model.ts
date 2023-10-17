import {DataTypes, Model, Optional, Sequelize} from "sequelize";
import {TypeOfWorkshop} from "./typeOfWorkshop.interface";

export type TypeOfWorkshopCreationAttributes = Optional<
    TypeOfWorkshop,
    "id" | "title_uz" | "title_ru" | "title_eng" | "photo"
>;

export class TypeOfWorkshopModel
    extends Model<TypeOfWorkshop, TypeOfWorkshopCreationAttributes>
    implements TypeOfWorkshop {
    public id: string;
    public title_uz: string;
    public title_ru: string;
    public title_eng: string;

    public photo: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof TypeOfWorkshopModel {
    TypeOfWorkshopModel.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            title_uz: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            title_ru: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            title_eng: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            photo: {
                type: DataTypes.STRING,
            },
        },
        {
            tableName: "typesofworkshops",
            sequelize,
        }
    );

    return TypeOfWorkshopModel;
}
