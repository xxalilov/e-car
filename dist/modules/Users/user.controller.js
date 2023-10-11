"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const user_service_1 = tslib_1.__importDefault(require("./user.service"));
class UserController {
    constructor() {
        this.userService = new user_service_1.default();
    }
    async getAllUsers(req, res, next) {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        try {
            const findAllUsersData = await this.userService.getAllUsers(page, pageSize);
            res.status(200).json(Object.assign(Object.assign({}, findAllUsersData), { message: "findAll" }));
        }
        catch (error) {
            next(error);
        }
    }
    async getUserById(req, res, next) {
        try {
            const findOneUserData = await this.userService.getUserById(req.params.id);
            res.status(200).json({ data: findOneUserData, message: "findOne" });
        }
        catch (error) {
            next(error);
        }
    }
    async updateUser(req, res, next) {
        try {
            const userData = req.body;
            console.log("BODY", req.body);
            console.log("FILE", req.files);
            if (req.files) {
                const photo = req.files.photo;
                if (photo) {
                    userData.photo = photo[0].path;
                }
            }
            const updatedUser = await this.userService.updateUserDetails(req.user.id.toString(), userData);
            res.status(200).json({ data: updatedUser, message: "updateUser" });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map