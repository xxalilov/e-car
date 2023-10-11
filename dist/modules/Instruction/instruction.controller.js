"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const instruction_service_1 = tslib_1.__importDefault(require("./instruction.service"));
class InstructionController {
    constructor() {
        this.instructionService = new instruction_service_1.default();
        this.getAllInstructions = async (req, res, next) => {
            try {
                const { page, pageSize } = req.query;
                const instructions = await this.instructionService.getAllInstructions(Number(page), Number(pageSize));
                res.status(200).json(Object.assign(Object.assign({}, instructions), { message: "getAll" }));
            }
            catch (error) {
                next(error);
            }
        };
        this.getInstructionById = async (req, res, next) => {
            try {
                const { typeId } = req.params;
                const instruction = await this.instructionService.getInstructionById(typeId);
                res.status(200).json({ data: instruction, message: "get" });
            }
            catch (error) {
                next(error);
            }
        };
        this.createInstruction = async (req, res, next) => {
            try {
                const instructionData = req.body;
                const instruction = await this.instructionService.createInstruction(instructionData);
                res.status(201).json({ data: instruction, message: "create" });
            }
            catch (error) {
                next(error);
            }
        };
        this.updateInstruction = async (req, res, next) => {
            try {
                const { typeId } = req.params;
                const instructionData = req.body;
                const instruction = await this.instructionService.updateInstruction(instructionData, typeId);
                res.status(200).json({ data: instruction, message: "update" });
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteInstruction = async (req, res, next) => {
            try {
                const { typeId } = req.params;
                const instruction = await this.instructionService.deleteInstruction(typeId);
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