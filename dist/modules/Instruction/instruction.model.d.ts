import { Model, Optional, Sequelize } from "sequelize";
import { Instruction } from "./instruction.interface";
export type InstructionCreationAttributes = Optional<Instruction, "id" | "title" | "description" | "link" | "type" | "typeId">;
export declare class InstructionModel extends Model<Instruction, InstructionCreationAttributes> implements Instruction {
    id: number;
    title: string;
    description: string;
    link: string;
    type: string;
    typeId: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default function (sequelize: Sequelize): typeof InstructionModel;
