import { ResultInterface } from "../../utils/pagination";
import { Instruction } from "./instruction.interface";
import { CreateInstructionDto, UpdateInstructionDto } from "./instruction.dto";
declare class InstructionService {
    instruction: typeof import("./instruction.model").InstructionModel;
    getAllInstructions(page: number, pageSize: number): Promise<ResultInterface>;
    getInstructionById(typeId: string, lang: string): Promise<Instruction[]>;
    createInstruction(instructionData: CreateInstructionDto): Promise<Instruction>;
    updateInstruction(instuctionData: UpdateInstructionDto, instructionId: string): Promise<Instruction>;
    deleteInstruction(instructionId: string): Promise<Instruction>;
}
export default InstructionService;
