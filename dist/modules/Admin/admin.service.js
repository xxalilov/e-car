"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const database_1 = require("../../utils/database");
const isEpmty_1 = require("../../utils/isEpmty");
const HttpException_1 = require("../../exceptions/HttpException");
class AdminService {
    constructor() {
        this.admin = database_1.models.Admin;
    }
    // public async getAdmins(): Promise<Admin[]> {
    //     return await this.admin.findAll();
    // }
    async updateAdminEmail(userId, userData) {
        if ((0, isEpmty_1.isEmpty)(userData))
            throw new HttpException_1.HttpException(400, "userData is empty");
        const findAdmin = await this.admin.findByPk(userId);
        if (!findAdmin)
            throw new HttpException_1.HttpException(409, "User doesn't exist");
        return await findAdmin.update(userData);
    }
    async updateAdminPassword(userId, userData) {
        if ((0, isEpmty_1.isEmpty)(userData))
            throw new HttpException_1.HttpException(400, "userData is empty");
        const findAdmin = await this.admin.findByPk(userId);
        if (!findAdmin)
            throw new HttpException_1.HttpException(409, "User doesn't exist");
        if (userData.password !== userData.reapetPassword)
            throw new HttpException_1.HttpException(409, "Passwords do not match");
        const matchPassword = await (0, bcrypt_1.compare)(userData.currentPassword, findAdmin.password);
        if (!matchPassword)
            throw new HttpException_1.HttpException(409, "Password is incorrect");
        const hashedPassword = await (0, bcrypt_1.hash)(userData.password, 10);
        return await findAdmin.update({ password: hashedPassword });
    }
}
exports.default = AdminService;
//# sourceMappingURL=admin.service.js.map