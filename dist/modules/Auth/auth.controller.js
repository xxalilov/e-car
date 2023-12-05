"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const auth_service_1 = tslib_1.__importDefault(require("./auth.service"));
class AuthController {
    constructor() {
        this.authService = new auth_service_1.default();
    }
    async signInAdmin(req, res, next) {
        try {
            const userData = req.body;
            const { cookie, findAdmin, token } = await this.authService.signinAdmin(userData);
            res.setHeader("Set-Cookie", [cookie]);
            res.status(200).json({ data: findAdmin, token, message: "signin admin" });
        }
        catch (error) {
            next(error);
        }
    }
    async sendConfirmation(req, res, next) {
        try {
            const phoneNumber = req.body.phoneNumber;
            const confirmationCode = await this.authService.sendConfirmation(phoneNumber);
            res
                .status(200)
                .json({ data: null, message: "Confirmation code sent succesfully" });
        }
        catch (error) {
            next(error);
        }
    }
    async checkConfirmation(req, res, next) {
        try {
            const { phoneNumber, confirmationCode } = req.body;
            const { token, cookie, user } = await this.authService.checkConfirmation(phoneNumber, confirmationCode);
            if (token && cookie && user) {
                res.setHeader("Set-Cookie", [cookie]);
                res.status(200).json({ data: user, token, message: "signin user" });
            }
            else {
                res
                    .status(403)
                    .json({ data: null, message: "Confirmation code is incorrect" });
            }
        }
        catch (error) {
            next(error);
        }
    }
    async getCurrentUser(req, res, next) {
        try {
            const user = req.user;
            res.status(200).json({
                message: "Sent User data",
                data: user,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map