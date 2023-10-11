import {NextFunction, Request, Response} from "express";
import InstructionService from "./instruction.service";

class InstructionController {
    public instructionService = new InstructionService();

    public getAllInstructions = async (req: Request, res: Response, next: NextFunction) => {
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 10;
        try {
            const instructions = await this.instructionService.getAllInstructions(page, pageSize);
            res.status(200).json({...instructions, message: "getAll"});
        } catch (error) {
            next(error);
        }
    }

    public getInstructionById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const instruction = await this.instructionService.getInstructionById(id);
            res.status(200).json({data: instruction, message: "get"});
        } catch (error) {
            next(error);
        }
    }

    public createInstruction = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const instructionData = req.body;
            const instruction = await this.instructionService.createInstruction(instructionData);
            res.status(201).json({data: instruction, message: "create"});
        } catch (error) {
            next(error);
        }
    }

    public updateInstruction = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {typeId} = req.params;
            const instructionData = req.body;
            const instruction = await this.instructionService.updateInstruction(instructionData, typeId);
            res.status(200).json({data: instruction, message: "update"});
        } catch (error) {
            next(error);
        }
    }

    public deleteInstruction = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {typeId} = req.params;
            const instruction = await this.instructionService.deleteInstruction(typeId);
            res.status(200).json({data: instruction, message: "delete"});
        } catch (error) {
            next(error);
        }
    }

}

export default InstructionController;