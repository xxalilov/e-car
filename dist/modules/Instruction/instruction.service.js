"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const database_1 = require("../../utils/database");
const pagination_1 = tslib_1.__importDefault(require("../../utils/pagination"));
const isEpmty_1 = require("../../utils/isEpmty");
const HttpException_1 = require("../../exceptions/HttpException");
class InstructionService {
    constructor() {
        this.instruction = database_1.models.Instruction;
    }
    async getAllInstructions(page, pageSize) {
        const paginationHelper = new pagination_1.default(this.instruction);
        return await paginationHelper.paginate(page, pageSize);
    }
    async getInstructionById(typeId) {
        if ((0, isEpmty_1.isEmpty)(typeId))
            throw new HttpException_1.HttpException(400, "typeId is empty");
        let instruction = await this.instruction.findOne({ where: { typeId } }) || await this.instruction.findOne({ where: { type: typeId } });
        if (!instruction)
            throw new HttpException_1.HttpException(400, "Instruction not found");
        return instruction;
    }
    async createInstruction(instructionData) {
        return await this.instruction.create(instructionData);
    }
    async updateInstruction(instuctionData, instructionId) {
        const instruction = await this.instruction.findByPk(instructionId);
        if (!instruction)
            throw new HttpException_1.HttpException(400, "Instruction not found");
        await instruction.update(instuctionData);
        return instruction;
    }
    async deleteInstruction(instructionId) {
        const instruction = await this.instruction.findByPk(instructionId);
        if (!instruction)
            throw new HttpException_1.HttpException(400, "Instruction not found");
        await instruction.destroy();
        return instruction;
    }
}
exports.default = InstructionService;
//# sourceMappingURL=instruction.service.js.map