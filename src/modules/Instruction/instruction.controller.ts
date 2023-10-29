import {NextFunction, Request, Response} from "express";
import InstructionService from "./instruction.service";
import path from "path";
import {RequestWithFile} from "../../interfaces/file-upload.interface";

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
            const {id} = req.params;
            const instruction = await this.instructionService.getInstructionById(id, req.query.lang as string);
            res.status(200).json({data: instruction, message: "get"});
        } catch (error) {
            next(error);
        }
    }

    public createInstruction = async (req: RequestWithFile, res: Response, next: NextFunction) => {
        try {
            const instructionData = req.body;
            if (req.files && Object.keys(req.files).length > 0) {
                const baseDir = path.join(__dirname, '../../../');
                const timestamp = Date.now();
                let sampleFile = req.files.photo as any;
                const newFileName = `file_${timestamp}-${sampleFile.name.replace(/\s/g, "")}`;
                const uploadPath = path.join(baseDir, 'uploads', 'images', newFileName);
                sampleFile.mv(uploadPath, function (err) {
                    if (err) next(err);
                });
                instructionData.photo = `uploads/images/${newFileName}`;
            }
            const instruction = await this.instructionService.createInstruction(instructionData);
            res.status(201).json({data: instruction, message: "create"});
        } catch (error) {
            next(error);
        }
    }

    public updateInstruction = async (req: RequestWithFile, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params;
            const instructionData = req.body;
            if (req.files && Object.keys(req.files).length > 0) {
                const baseDir = path.join(__dirname, '../../../');
                const timestamp = Date.now();
                let sampleFile = req.files.photo as any;
                const newFileName = `file_${timestamp}-${sampleFile.name.replace(/\s/g, "")}`;
                const uploadPath = path.join(baseDir, 'uploads', 'images', newFileName);
                sampleFile.mv(uploadPath, function (err) {
                    if (err) next(err);
                });
                instructionData.photo = `uploads/images/${newFileName}`;
            }
            const instruction = await this.instructionService.updateInstruction(instructionData, id);
            res.status(200).json({data: instruction, message: "update"});
        } catch (error) {
            next(error);
        }
    }

    public deleteInstruction = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params;
            const instruction = await this.instructionService.deleteInstruction(id);
            res.status(200).json({data: instruction, message: "delete"});
        } catch (error) {
            next(error);
        }
    }

}

export default InstructionController;