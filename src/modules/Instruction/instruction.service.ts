import {models} from "../../utils/database";
import PaginationHelper, {ResultInterface} from "../../utils/pagination";
import {isEmpty} from "../../utils/isEpmty";
import {HttpException} from "../../exceptions/HttpException";
import {Instruction} from "./instruction.interface";
import {CreateInstructionDto, UpdateInstructionDto} from "./instruction.dto";

class InstructionService {
    public instruction = models.Instruction;

    public async getAllInstructions(
        page: number,
        pageSize: number
    ): Promise<ResultInterface> {
        const paginationHelper = new PaginationHelper(this.instruction);
        return  await paginationHelper.paginate(page, pageSize);
    }

    public async getInstructionById(typeId: string): Promise<Instruction> {
        if (isEmpty(typeId)) throw new HttpException(400, "typeId is empty");
        let instruction: Instruction = await this.instruction.findOne({where: {typeId}}) || await this.instruction.findOne({where: {type: typeId}});
        if (!instruction) throw new HttpException(400, "Instruction not found");
        return instruction;
    }

    public async createInstruction(instructionData: CreateInstructionDto): Promise<Instruction> {
        return await this.instruction.create(instructionData);
    }

    public async updateInstruction(instuctionData: UpdateInstructionDto, instructionId: string): Promise<Instruction> {
        const instruction = await this.instruction.findByPk(instructionId);
        if (!instruction) throw new HttpException(400, "Instruction not found");
        await instruction.update(instuctionData);
        return instruction
    }

    public async deleteInstruction(instructionId: string): Promise<Instruction> {
        const instruction = await this.instruction.findByPk(instructionId);
        if (!instruction) throw new HttpException(400, "Instruction not found");
        await instruction.destroy();
        return instruction;
    }
}

export default InstructionService;
