"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const pagination_1 = tslib_1.__importDefault(require("../../utils/pagination"));
const database_1 = require("../../utils/database");
const HttpException_1 = require("../../exceptions/HttpException");
const isEpmty_1 = require("../../utils/isEpmty");
const file_1 = require("../../utils/file");
class UserService {
    constructor() {
        this.user = database_1.models.User;
    }
    async getAllUsers(page, pageSize) {
        const paginationHelper = new pagination_1.default(this.user);
        const result = await paginationHelper.paginate(page, pageSize);
        return result;
    }
    async getUserById(userId) {
        if ((0, isEpmty_1.isEmpty)(userId))
            throw new HttpException_1.HttpException(400, "userId is empty");
        const user = await this.user.findByPk(userId);
        if (!user)
            throw new HttpException_1.HttpException(400, "User not found");
        return user;
    }
    async updateUserDetails(userId, userData) {
        if ((0, isEpmty_1.isEmpty)(userData))
            throw new HttpException_1.HttpException(400, "userData is empty");
        const user = await this.user.findByPk(userId);
        if (!user)
            throw new HttpException_1.HttpException(409, "User doesn't exist");
        if (user.photo && userData.photo)
            (0, file_1.deleteFile)(user.photo);
        return await user.update(userData);
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map