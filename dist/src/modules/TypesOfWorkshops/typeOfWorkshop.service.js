"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../../utils/database");
const isEpmty_1 = require("../../utils/isEpmty");
const HttpException_1 = require("../../exceptions/HttpException");
const file_1 = require("../../utils/file");
class TypeOfWorkshopService {
    constructor() {
        this.typeOfWorkshop = database_1.models.TypeOfWorkshop;
    }
    async getAllTypesOfWorkshop(lang) {
        if (lang === "all") {
            return await this.typeOfWorkshop.findAll({
                attributes: [
                    "id",
                    "title_uz",
                    "title_ru",
                    "title_eng",
                    "photo",
                ]
            });
        }
        return await this.typeOfWorkshop.findAll({
            attributes: [
                "id",
                [sequelize_1.Sequelize.literal(`COALESCE("title_${lang}")`), 'title'],
                "photo",
            ]
        });
    }
    async createTypeOfWorkshop(data) {
        if (!data.photo) {
            throw new HttpException_1.HttpException(400, "Please input photo");
        }
        return await this.typeOfWorkshop.create(data);
    }
    async updateTypeOfWorkshop(typeOfWorkshopId, updateData) {
        if ((0, isEpmty_1.isEmpty)(typeOfWorkshopId))
            throw new HttpException_1.HttpException(400, "Please input id");
        const typeOfWorkshop = await this.typeOfWorkshop.findByPk(typeOfWorkshopId);
        if (!typeOfWorkshop)
            throw new HttpException_1.HttpException(400, "Type Of Workshop not found");
        if (updateData.photo && typeOfWorkshop.photo)
            (0, file_1.deleteFile)(typeOfWorkshop.photo);
        await typeOfWorkshop.update(updateData);
        return typeOfWorkshop;
    }
    async deleteTypeOfWorkshop(typeOfWorkshopId) {
        if ((0, isEpmty_1.isEmpty)(typeOfWorkshopId))
            throw new HttpException_1.HttpException(400, "Please input id");
        const typeOfWorkshop = await this.typeOfWorkshop.findByPk(typeOfWorkshopId);
        if (!typeOfWorkshop)
            throw new HttpException_1.HttpException(400, "Type Of Workshop not found");
        if (typeOfWorkshop.photo)
            (0, file_1.deleteFile)(typeOfWorkshop.photo);
        await typeOfWorkshop.destroy();
        return typeOfWorkshop;
    }
}
exports.default = TypeOfWorkshopService;
//# sourceMappingURL=typeOfWorkshop.service.js.map