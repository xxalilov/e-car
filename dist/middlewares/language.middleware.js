"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../exceptions/HttpException");
async function default_1(req, res, next) {
    const lang = req.query.lang;
    try {
        if (!lang)
            next(new HttpException_1.HttpException(400, "Please input language"));
        if (lang !== "uz" && lang !== "ru" && lang !== "eng")
            next(new HttpException_1.HttpException(400, "Please input correct language"));
        next();
    }
    catch (error) {
        next(error);
    }
}
exports.default = default_1;
//# sourceMappingURL=language.middleware.js.map