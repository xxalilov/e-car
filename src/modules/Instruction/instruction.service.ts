import {models} from "../../utils/database";
import PaginationHelper, {ResultInterface} from "../../utils/pagination";
import {isEmpty} from "../../utils/isEpmty";
import {HttpException} from "../../exceptions/HttpException";
import {Instruction} from "./instruction.interface";
import {CreateInstructionDto, UpdateInstructionDto} from "./instruction.dto";
import {Sequelize} from "sequelize";
import {deleteFile} from "../../utils/file";

class InstructionService {
    public instruction = models.Instruction;

    public async getAllInstructions(
        page: number,
        pageSize: number
    ): Promise<ResultInterface> {
        const paginationHelper = new PaginationHelper(this.instruction);
        return await paginationHelper.paginate(page, pageSize);
    }

    public async getInstructionById(typeId: string, lang: string): Promise<Instruction[]> {
        if (isEmpty(typeId)) throw new HttpException(400, "typeId is empty");
        let instruction: Instruction[] = await this.instruction.findAll({
            where: {typeId}, attributes: [
                "id",
                [Sequelize.literal(`COALESCE("title_${lang}")`), 'title'],
                [Sequelize.literal(`COALESCE("description_${lang}")`), 'description'],
                "link",
                "type",
                "typeId",
            ]
        }) || await this.instruction.findAll({
            where: {type: typeId}, attributes: [
                "id",
                [Sequelize.literal(`COALESCE("title_${lang}")`), 'title'],
                [Sequelize.literal(`COALESCE("description_${lang}")`), 'description'],
                "link",
                "type",
                "typeId",
            ]
        });
        if (!instruction) throw new HttpException(400, "Instruction not found");
        return instruction;
    }

    public async createInstruction(instructionData: CreateInstructionDto): Promise<Instruction> {
        return await this.instruction.create(instructionData);
    }

    public async updateInstruction(instructionData: UpdateInstructionDto, instructionId: string): Promise<Instruction> {
        const instruction = await this.instruction.findByPk(instructionId);
        if (!instruction) throw new HttpException(400, "Instruction not found");
        if (instructionData.youtubeCover && instruction.youtubeCover) deleteFile(instruction.youtubeCover)
        await instruction.update(instructionData);
        return instruction
    }

    public async deleteInstruction(instructionId: string): Promise<Instruction> {
        const instruction = await this.instruction.findByPk(instructionId);
        if (!instruction) throw new HttpException(400, "Instruction not found");
        if (instruction.youtubeCover) deleteFile(instruction.youtubeCover)
        await instruction.destroy();
        return instruction;
    }
}

export default InstructionService;
