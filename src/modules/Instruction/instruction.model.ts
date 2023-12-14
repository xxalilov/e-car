import {DataTypes, Model, Optional, Sequelize} from "sequelize";
import {Instruction} from "./instruction.interface";

export type InstructionCreationAttributes = Optional<Instruction, "id" | "title_uz" | "title_ru" | "title_eng" | "description_uz" | "description_eng" | "description_ru" | "link" | "youtubeCover" | "type" | "typeId">;

export class InstructionModel extends Model<Instruction, InstructionCreationAttributes> implements Instruction {
    public id: number;
    public title_uz: string;
    public title_ru: string;
    public title_eng: string;
    public description_uz: string;
    public description_ru: string;
    public description_eng: string;
    public link: string;
    public youtubeCover: string;
    public type: string;
    public typeId: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof InstructionModel {
    InstructionModel.init({
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        title_uz: {
            type: DataTypes.STRING(400),
        },
        title_ru: {
            type: DataTypes.STRING(400),
        },
        title_eng: {
            type: DataTypes.STRING(400),
        },
        description_uz: {
            type: DataTypes.STRING(1000)
        },
        description_ru: {
            type: DataTypes.STRING(1000)
        },
        description_eng: {
            type: DataTypes.STRING(1000)
        },

        link: {
            type: DataTypes.STRING
        },
        youtubeCover: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING
        },
        typeId: {
            type: DataTypes.STRING
        }

    }, {
        tableName: "instructions",
        sequelize,
        timestamps: true
    })

    return InstructionModel;
}