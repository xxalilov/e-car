"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const admin_service_1 = tslib_1.__importDefault(require("./admin.service"));
class AdminController {
    constructor() {
        this.adminService = new admin_service_1.default();
    }
    async updateAdminEmail(req, res, next) {
        try {
            const userData = req.body;
            const userId = req.user.id.toString();
            const updatedUser = await this.adminService.updateAdminEmail(userId, userData);
            res.status(200).json({ data: updatedUser, message: "updateUserEmail" });
        }
        catch (error) {
            next(error);
        }
    }
    async updateAdminPassword(req, res, next) {
        try {
            const userData = req.body;
            const userId = req.user.id.toString();
            const updatedUser = await this.adminService.updateAdminPassword(userId, userData);
            res
                .status(200)
                .json({ data: updatedUser, message: "updateUserPassword" });
        }
        catch (error) {
            next(error);
        }
    }
    async getAllAdmins(req, res, next) {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        try {
            const findAllAdminData = await this.adminService.getAllAdmins(page, pageSize);
            res.status(200).json(Object.assign(Object.assign({}, findAllAdminData), { message: "findAll" }));
        }
        catch (error) {
            next(error);
        }
    }
    async updateAdminDetails(req, res, next) {
        try {
            const userData = req.body;
            const userId = req.params.id;
            const updatedUser = await this.adminService.updateAdminDetails(userId, userData);
            res
                .status(200)
                .json({ data: updatedUser, message: "updateUserDetails" });
        }
        catch (error) {
            next(error);
        }
    }
    async createAdmin(req, res, next) {
        try {
            const adminData = req.body;
            const newAdmin = await this.adminService.createAdmin(adminData);
            res.status(201).json({ data: newAdmin, message: "created" });
        }
        catch (error) {
            next(error);
        }
    }
    async deleteAdminById(req, res, next) {
        try {
            const deletedAdminData = await this.adminService.deleteAdmin(req.params.id);
            res.status(200).json({ data: deletedAdminData, message: "deleted" });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = AdminController;
//# sourceMappingURL=admin.controller.js.map