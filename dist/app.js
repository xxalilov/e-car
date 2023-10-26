"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = require("path");
const express_1 = tslib_1.__importStar(require("express"));
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const express_fileupload_1 = tslib_1.__importDefault(require("express-fileupload"));
const database_1 = tslib_1.__importDefault(require("./utils/database"));
const config_1 = tslib_1.__importDefault(require("./config/config"));
const HttpException_1 = require("./exceptions/HttpException");
const error_handler_middleware_1 = tslib_1.__importDefault(require("./middlewares/error-handler.middleware"));
// Routes
const index_route_1 = tslib_1.__importDefault(require("./routes/index.route"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = config_1.default.PORT || 3000;
        this.initializeMiddleware();
        this.connectDatabase();
        this.initializeRoutes();
        this.initializeErrorHandler();
    }
    connectDatabase() {
        (0, database_1.default)().then(() => {
            console.log("DATABASE CONNECTED");
        });
    }
    initializeMiddleware() {
        this.app.use("/uploads/images", (0, express_1.static)((0, path_1.join)(__dirname, "../", "uploads", "images")));
        this.app.use((0, express_fileupload_1.default)());
        this.app.use((0, cors_1.default)());
        this.app.use((0, express_1.json)());
        this.app.use((0, cookie_parser_1.default)());
    }
    initializeRoutes() {
        this.app.post("/api/v1/upload", (req, res) => {
            let sampleFile;
            let uploadPath;
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).send('No files were uploaded.');
            }
            // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
            // @ts-ignore
            sampleFile = req.files.photo;
            uploadPath = __dirname + '/upload/images/' + sampleFile.name;
            // Use the mv() method to place the file somewhere on your server
            sampleFile.mv(uploadPath, function (err) {
                if (err)
                    return res.status(500).send(err);
                res.send('File uploaded!');
            });
        });
        this.app.use("/api/v1", index_route_1.default);
        this.app.all("*", () => {
            throw new HttpException_1.HttpException(400, "Route Not Found");
        });
    }
    initializeErrorHandler() {
        this.app.use(error_handler_middleware_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("================================================");
            console.log(`🚀 App is listening on the PORT: ${this.port}`);
            console.log("================================================");
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map