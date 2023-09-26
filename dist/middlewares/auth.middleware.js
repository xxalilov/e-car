"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsonwebtoken_1 = require("jsonwebtoken");
const HttpException_1 = require("../exceptions/HttpException");
const config_1 = tslib_1.__importDefault(require("../config/config"));
const database_1 = require("../utils/database");
const authMiddleware = (role) => async (req, res, next) => {
    var _a;
    try {
        const Authorization = req.cookies["Authorization"] ||
            (req.header("Authorization")
                ? (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split("Bearer ")[1]
                : null);
        if (Authorization) {
            const secretKey = config_1.default.SECRET_KEY;
            const verificationResponse = (0, jsonwebtoken_1.verify)(Authorization, secretKey);
            const userId = verificationResponse.id;
            if (role === "all") {
                const findAdmin = await database_1.models.Admin.findByPk(userId);
                const findUser = await database_1.models.User.findByPk(userId);
                if (findAdmin) {
                    req.user = findAdmin;
                    next();
                }
                else if (findUser) {
                    req.user = findUser;
                    next();
                }
                else {
                    next(new HttpException_1.HttpException(401, "Wrong authentication token"));
                }
            }
            else if (role === "admin") {
                const findAdmin = await database_1.models.Admin.findByPk(userId);
                if (findAdmin) {
                    req.user = findAdmin;
                    next();
                }
                else {
                    next(new HttpException_1.HttpException(401, "Wrong authentication token"));
                }
            }
            else if (role === "user") {
                const findUser = await database_1.models.User.findByPk(userId);
                if (findUser) {
                    req.user = findUser;
                    next();
                }
                else {
                    next(new HttpException_1.HttpException(401, "Wrong authentication token"));
                }
            }
            else {
                next(new HttpException_1.HttpException(500, "Server error"));
            }
        }
        else {
            next(new HttpException_1.HttpException(404, "Authentication token missing"));
        }
    }
    catch (error) {
        next(new HttpException_1.HttpException(401, "Wrong authentication token"));
    }
};
exports.default = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map