import {DataTypes, Model, Optional, Sequelize} from "sequelize";
import {Station} from "./station.interface";

export type StationCreationAttributes = Optional<
    Station,
    "id" | "lat" | "long" | "title_uz" | "title_ru" | "title_eng"
>;

export class StationModel
    extends Model<Station, StationCreationAttributes>
    implements Station {
    public id: string;
    public lat: string;
    public long: string;
    public title_uz: string;
    public title_ru: string;
    public title_eng: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof StationModel {
    StationModel.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            lat: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            long: {
                type: DataTypes.STRING,
                allowNull: false,
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
        },
        {
            tableName: "stations",
            sequelize,
        }
    );

    return StationModel;
}
