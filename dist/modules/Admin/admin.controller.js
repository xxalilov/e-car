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
            const updatedUser = await this.adminService.updateAdminEmail(req.user.id, userData);
            res.status(200).json({ data: updatedUser, message: "updateUserEmail" });
        }
        catch (error) {
            next(error);
        }
    }
    async updateAdminPassword(req, res, next) {
        try {
            const userData = req.body;
            const updatedUser = await this.adminService.updateAdminPassword(req.user.id, userData);
            res
                .status(200)
                .json({ data: updatedUser, message: "updateUserPassword" });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = AdminController;
//# sourceMappingURL=admin.controller.js.map