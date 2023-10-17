import {DataTypes, Model, Optional, Sequelize} from "sequelize";
import {Workshop} from "./workshop.interface";
import {TypeOfWorkshopModel} from "../../modules/TypesOfWorkshops/typeOfWorkshop.model";

export type WorkshopCreationAttributes = Optional<
    Workshop,
    | "id"
    | "address_uz"
    | "address_ru"
    | "address_eng"
    | "description_uz"
    | "description_ru"
    | "description_eng"
    | "title_uz"
    | "title_ru"
    | "title_eng"
    | "phone"
    | "workingTime"
    | "lat"
    | "long"
    | "typeOfWorkshopId"
>;

export class WorkshopModel
    extends Model<Workshop, WorkshopCreationAttributes>
    implements Workshop {
    public id: string;
    public address_uz: string;
    public address_ru: string;
    public address_eng: string;
    public description_uz: string;
    public description_ru: string;
    public description_eng: string;
    public title_uz: string;
    public title_ru: string;
    public title_eng: string;
    public phone: string;
    public workingTime: string;
    public lat: string;
    public long: string;
    public typeOfWorkshopId: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof WorkshopModel {
    WorkshopModel.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            address_uz: {
                type: DataTypes.STRING,
                allowNull: false,
            }, address_ru: {
                type: DataTypes.STRING,
                allowNull: false,
            }, address_eng: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description_uz: {
                type: DataTypes.STRING,
                allowNull: false,
            }, description_ru: {
                type: DataTypes.STRING,
                allowNull: false,
            }, description_eng: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            title_uz: {
                type: DataTypes.STRING,
                allowNull: false,
            }, title_ru: {
                type: DataTypes.STRING,
                allowNull: false,
            }, title_eng: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            workingTime: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lat: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            long: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            typeOfWorkshopId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: "workshops",
            sequelize,
        }
    );

    // TypeOfWorkshopModel.hasMany(WorkshopModel, {
    //   foreignKey: "typeOfWorkshopId",
    //   as: "workshops",
    // });
    // WorkshopModel.belongsTo(TypeOfWorkshopModel, {
    //   foreignKey: "typeOfWorkshopId",
    //   as: "type",
    // });

    return WorkshopModel;
}
