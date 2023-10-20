import { Model, Optional, Sequelize } from "sequelize";
import { Instruction } from "./instruction.interface";
export type InstructionCreationAttributes = Optional<Instruction, "id" | "title_uz" | "title_ru" | "title_eng" | "description_uz" | "description_eng" | "description_ru" | "link" | "type" | "typeId">;
export declare class InstructionModel extends Model<Instruction, InstructionCreationAttributes> implements Instruction {
    id: number;
    title_uz: string;
    title_ru: string;
    title_eng: string;
    description_uz: string;
    description_ru: string;
    description_eng: string;
    link: string;
    type: string;
    typeId: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default function (sequelize: Sequelize): typeof InstructionModel;
