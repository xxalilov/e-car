"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bcrypt_1 = require("bcrypt");
const database_1 = require("../../utils/database");
const isEpmty_1 = require("../../utils/isEpmty");
const HttpException_1 = require("../../exceptions/HttpException");
const pagination_1 = tslib_1.__importDefault(require("../../utils/pagination"));
class AdminService {
    constructor() {
        this.admin = database_1.models.Admin;
    }
    async updateAdminDetails(id, updateData) {
        const admin = await this.admin.findByPk(id);
        if (!admin)
            throw new HttpException_1.HttpException(400, "Admin not found");
        if (updateData.password && updateData.password.length > 0) {
            updateData.password = await (0, bcrypt_1.hash)(updateData.password, 10);
        }
        else {
            updateData.password = admin.password;
        }
        await admin.update(updateData);
        return admin;
    }
    async createAdmin(adminData) {
        if ((0, isEpmty_1.isEmpty)(adminData))
            throw new HttpException_1.HttpException(400, "AdminData is empty");
        adminData.password = adminData.password = await (0, bcrypt_1.hash)(adminData.password, 10);
        return await this.admin.create(adminData);
    }
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
    async getAllAdmins(page, pageSize) {
        const paginationHelper = new pagination_1.default(this.admin);
        return await paginationHelper.paginate(page, pageSize);
    }
    async deleteAdmin(adminId) {
        if ((0, isEpmty_1.isEmpty)(adminId))
            throw new HttpException_1.HttpException(400, "Please input adminId");
        const admin = await this.admin.findByPk(adminId);
        if (!admin)
            throw new HttpException_1.HttpException(400, "admin not found");
        await admin.destroy();
        return admin;
    }
}
exports.default = AdminService;
//# sourceMappingURL=admin.service.js.map