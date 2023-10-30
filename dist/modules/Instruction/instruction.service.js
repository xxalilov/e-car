"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const database_1 = require("../../utils/database");
const pagination_1 = tslib_1.__importDefault(require("../../utils/pagination"));
const isEpmty_1 = require("../../utils/isEpmty");
const HttpException_1 = require("../../exceptions/HttpException");
const sequelize_1 = require("sequelize");
const file_1 = require("../../utils/file");
class InstructionService {
    constructor() {
        this.instruction = database_1.models.Instruction;
    }
    async getAllInstructions(page, pageSize) {
        const paginationHelper = new pagination_1.default(this.instruction);
        return await paginationHelper.paginate(page, pageSize);
    }
    async getInstructionById(typeId, lang) {
        if ((0, isEpmty_1.isEmpty)(typeId))
            throw new HttpException_1.HttpException(400, "typeId is empty");
        let instruction = await this.instruction.findAll({
            where: { typeId }, attributes: [
                "id",
                [sequelize_1.Sequelize.literal(`COALESCE("title_${lang}")`), 'title'],
                [sequelize_1.Sequelize.literal(`COALESCE("description_${lang}")`), 'description'],
                "link",
                "type",
                "typeId",
            ]
        }) || await this.instruction.findAll({
            where: { type: typeId }, attributes: [
                "id",
                [sequelize_1.Sequelize.literal(`COALESCE("title_${lang}")`), 'title'],
                [sequelize_1.Sequelize.literal(`COALESCE("description_${lang}")`), 'description'],
                "link",
                "type",
                "typeId",
            ]
        });
        if (!instruction)
            throw new HttpException_1.HttpException(400, "Instruction not found");
        return instruction;
    }
    async createInstruction(instructionData) {
        return await this.instruction.create(instructionData);
    }
    async updateInstruction(instructionData, instructionId) {
        const instruction = await this.instruction.findByPk(instructionId);
        if (!instruction)
            throw new HttpException_1.HttpException(400, "Instruction not found");
        if (instructionData.youtubeCover && instruction.youtubeCover)
            (0, file_1.deleteFile)(instruction.youtubeCover);
        await instruction.update(instructionData);
        return instruction;
    }
    async deleteInstruction(instructionId) {
        const instruction = await this.instruction.findByPk(instructionId);
        if (!instruction)
            throw new HttpException_1.HttpException(400, "Instruction not found");
        if (instruction.youtubeCover)
            (0, file_1.deleteFile)(instruction.youtubeCover);
        await instruction.destroy();
        return instruction;
    }
}
exports.default = InstructionService;
//# sourceMappingURL=instruction.service.js.map