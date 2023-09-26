"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../utils/database");
const isEpmty_1 = require("../../utils/isEpmty");
const HttpException_1 = require("../../exceptions/HttpException");
const bcrypt_1 = require("bcrypt");
class AdminService {
    constructor() {
        this.admin = database_1.models.Admin;
    }
    async updateAdminEmail(userId, userData) {
        if ((0, isEpmty_1.isEmpty)(userData))
            throw new HttpException_1.HttpException(400, "userData is empty");
        const findAdmin = await this.admin.findByPk(userId);
        if (!findAdmin)
            throw new HttpException_1.HttpException(409, "User doesn't exist");
        const updatedData = await findAdmin.update(userData);
        return updatedData;
    }
    async updateAdminPassword(userId, userData) {
        if ((0, isEpmty_1.isEmpty)(userData))
            throw new HttpException_1.HttpException(400, "userData is empty");
        const findAdmin = await this.admin.findByPk(userId);
        if (!findAdmin)
            throw new HttpException_1.HttpException(409, "User doesn't exist");
        const hashedPassword = await (0, bcrypt_1.hash)(userData.password, 10);
        const updatedData = await findAdmin.update({ password: hashedPassword });
        return updatedData;
    }
}
exports.default = AdminService;
//# sourceMappingURL=admin.service.js.map