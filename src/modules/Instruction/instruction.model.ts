import {DataTypes, Model, Optional, Sequelize} from "sequelize";
import {Instruction} from "./instruction.interface";

export type InstructionCreationAttributes = Optional<Instruction, "id" | "title" | "description" | "link" | "type" | "typeId">;

export class InstructionModel extends Model<Instruction, InstructionCreationAttributes> implements Instruction {
    public id: number;
    public title: string;
    public description: string;
    public link: string;
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
        title: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING
        },
        link: {
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