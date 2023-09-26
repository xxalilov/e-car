"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
class HttpException extends Error {
    constructor(status, message) {
        super(message);
        this.status = status || 500;
        this.message = message || "Server error";
    }
}
exports.HttpException = HttpException;
//# sourceMappingURL=HttpException.js.map