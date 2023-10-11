import { NextFunction, Request, Response } from "express";
import InstructionService from "./instruction.service";
declare class InstructionController {
    instructionService: InstructionService;
    getAllInstructions: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getInstructionById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createInstruction: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateInstruction: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteInstruction: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export default InstructionController;
