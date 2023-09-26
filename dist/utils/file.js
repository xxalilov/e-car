"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.upload = void 0;
const tslib_1 = require("tslib");
const fs_1 = require("fs");
const multer_1 = tslib_1.__importDefault(require("multer"));
const fileStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime().toString() +
            "-" +
            file.originalname.replace(/\s/g, ""));
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const deleteFile = (filePath) => {
    (0, fs_1.unlink)(filePath, (err) => {
        if (!err) {
            return console.log("Deleted File");
        }
        console.log("File didn't delete");
    });
};
exports.deleteFile = deleteFile;
const upload = (0, multer_1.default)({
    storage: fileStorage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 },
});
exports.upload = upload;
//# sourceMappingURL=file.js.map