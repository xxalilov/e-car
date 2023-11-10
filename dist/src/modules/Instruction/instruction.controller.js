"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const instruction_service_1 = tslib_1.__importDefault(require("./instruction.service"));
const path_1 = tslib_1.__importDefault(require("path"));
class InstructionController {
    constructor() {
        this.instructionService = new instruction_service_1.default();
        this.getAllInstructions = async (req, res, next) => {
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;
            try {
                const instructions = await this.instructionService.getAllInstructions(page, pageSize);
                res.status(200).json(Object.assign(Object.assign({}, instructions), { message: "getAll" }));
            }
            catch (error) {
                next(error);
            }
        };
        this.getInstructionById = async (req, res, next) => {
            try {
                const { id } = req.params;
                const instruction = await this.instructionService.getInstructionById(id, req.query.lang);
                res.status(200).json({ data: instruction, message: "get" });
            }
            catch (error) {
                next(error);
            }
        };
        this.createInstruction = async (req, res, next) => {
            try {
                const instructionData = req.body;
                if (req.files && Object.keys(req.files).length > 0) {
                    const baseDir = path_1.default.join(__dirname, '../../../');
                    const timestamp = Date.now();
                    let sampleFile = req.files.photo;
                    const newFileName = `file_${timestamp}-${sampleFile.name.replace(/\s/g, "")}`;
                    const uploadPath = path_1.default.join(baseDir, 'uploads', 'images', newFileName);
                    sampleFile.mv(uploadPath, function (err) {
                        if (err)
                            next(err);
                    });
                    instructionData.youtubeCover = `uploads/images/${newFileName}`;
                }
                const instruction = await this.instructionService.createInstruction(instructionData);
                res.status(201).json({ data: instruction, message: "create" });
            }
            catch (error) {
                next(error);
            }
        };
        this.updateInstruction = async (req, res, next) => {
            try {
                const { id } = req.params;
                const instructionData = req.body;
                if (req.files && Object.keys(req.files).length > 0) {
                    const baseDir = path_1.default.join(__dirname, '../../../');
                    const timestamp = Date.now();
                    let sampleFile = req.files.photo;
                    const newFileName = `file_${timestamp}-${sampleFile.name.replace(/\s/g, "")}`;
                    const uploadPath = path_1.default.join(baseDir, 'uploads', 'images', newFileName);
                    sampleFile.mv(uploadPath, function (err) {
                        if (err)
                            next(err);
                    });
                    instructionData.youtubeCover = `uploads/images/${newFileName}`;
                }
                const instruction = await this.instructionService.updateInstruction(instructionData, id);
                res.status(200).json({ data: instruction, message: "update" });
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteInstruction = async (req, res, next) => {
            try {
                const { id } = req.params;
                const instruction = await this.instructionService.deleteInstruction(id);
                res.status(200).json({ data: instruction, message: "delete" });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = InstructionController;
//# sourceMappingURL=instruction.controller.js.map